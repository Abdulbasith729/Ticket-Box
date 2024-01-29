import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Img1 from '../assets/1.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {
  const [email, setemail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('userEmail', email);
    setUser(email);
    navigate('/');
  };

  return (
    <div id='auth-Container' style={{ padding: '20px' }}>
      <Container className='auth-inner-container'>
        <Row>
          <Col>
            <img src={Img1} width={450} height={350} alt="Your Alt Text Here" />
          </Col>
          <Col className='auth-inner-container'>
            <Card style={{ width: '25rem', padding: '25px' }}>
              <Card.Body>
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>

                  <Button variant="primary" type="submit" className='login-btn' onClick={handleLogin} >
                    Login
                  </Button>
                </Form>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px', padding: '10px' }}>
                  New here? Please{' '}
                  <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/Signup')}>
                    Signup
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
