import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Select() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title } = location.state || { title: 'Default Title' }; // Provide a default title if location.state is null
  const [seatsMatrix, setSeatsMatrix] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSelect = (newSeat) => {
    const isSeatSelected = selectedSeats.includes(newSeat);

    if (isSeatSelected) {
      setSelectedSeats((prevSeats) => prevSeats.filter((seat) => seat !== newSeat));
    } else {
      setSelectedSeats((prevSeats) => [...prevSeats, newSeat]);
    }
  };

  const createSeats = () => {
    let totalRows = 5;
    let numberofRowSeat = 8;
    let tempSeats = [];
    let row = 0;
    let ch = 'A';

    while (row < totalRows) {
      let col = 1;
      let rowArr = [];

      while (col <= numberofRowSeat) {
        rowArr.push(ch + col);
        col++;
      }

      tempSeats.push(rowArr);
      row++;
      ch = String.fromCharCode(ch.charCodeAt(0) + 1);
    }

    setSeatsMatrix(tempSeats);
  };

  useEffect(() => {
    createSeats();
  }, []);

  if (!title) {
    return (
      <div style={{ padding: 50 }}>
        <h3>Error: Title not provided</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h3 className="d-inline-block">{title}</h3>
        <div style={{ marginLeft: 100 }} className="d-inline-block">
          screen this side
        </div>
      </div>
      <div style={{ marginTop: 45 }}>
        {seatsMatrix.map((seatsArr, rowIndex) => (
          <Row key={rowIndex} style={{ marginTop: 20 }}>
            {seatsArr.map((seat, colIndex) => {
              const isSelected = selectedSeats.includes(seat);
              return (
                <Col key={colIndex}>
                  <Button
                    style={{
                      width: '100px',
                      backgroundColor: isSelected ? 'blue' : 'grey',
                      border: 'none',
                    }}
                    onClick={() => handleSelect(seat)}
                  >
                    {seat}
                  </Button>
                </Col>
              );
            })}
          </Row>
        ))}
      </div>
      <div style={{ marginTop: 45 }}>
        {selectedSeats.length > 0 ? (
          <h5>
            {selectedSeats.map((seat, index) => (
              <span key={index} style={{ marginRight: 5 }}>
                {seat}
              </span>
            ))}
            seat selected
          </h5>
        ) : (
          <h5>No seat selected</h5>
        )}
        <div>
          <h5>Total Rs {selectedSeats.length * 200} </h5>
          <Button onClick={() => navigate('/Success')}>Checkout</Button>
        </div>
      </div>
    </div>
  );
}
