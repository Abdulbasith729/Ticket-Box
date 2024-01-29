import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, // Make sure to import BrowserRouter
  Route,
  Routes,
  Link,
  useNavigate,
} from 'react-router-dom';
import './App.css';
import { Button, Container, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './assets/2.png';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Movie from './Components/Movie';
import Select from './Components/Select';
import Success from './Components/Success';


function App() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');

    if (userEmail) {
      setUser(userEmail);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
   
      <div className="App">
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img
                alt=""
                src={Logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              Ticket box
            </Navbar.Brand>
            {user && (
              <Button className="Logout-btn" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Container>
        </Navbar>
        <Routes>
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/" element={<Home     />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/select" element={<Select />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
 
  );
}

export default App;
