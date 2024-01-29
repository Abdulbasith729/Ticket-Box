import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Img1 from '../assets/1.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

export default function Signup({ setUser }) {
  const [email, setemail] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    // e.preventDefault();
    localStorage.setItem('userEmail', email);
    setUser(email);
    navigate('/login');
  };

  return (
    <div id='auth-Container'>
      <Container className='auth-inner-container'>
        <Row>
          <Col>
            <img src={Img1} width={450} height={450} alt="Your Alt Text Here" />
          </Col>
          <Col className='auth-inner-container'>
            <Card style={{ width: '25rem', padding: 25 }}>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={(e) => setemail(e.currentTarget.value)}
                      value={email}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicRePassword">
                    <Form.Label>Re-Password</Form.Label>
                    <Form.Control type="password" placeholder="Re-Password" />
                  </Form.Group>

                  <Button variant="primary" type="submit" className='login-btn' onClick={handleSignup}>
                    Signup
                  </Button>
                </Form>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px', padding: '10px' }}>
                  Already signed up?{' '}
                  <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/login')}>
                    Login
                  </span>
                  .
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
