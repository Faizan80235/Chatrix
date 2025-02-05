import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Login() {

  return (
    <div style={{ backgroundColor: '#003366', minHeight: '100vh' }}>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Form className="p-4" style={{ backgroundColor: '#003366', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
          <h2 className="text-white text-center mb-4">Welcome To Chatrix</h2>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              name="email" 
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              name="password" 
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Contact Number</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter contact number" 
              name="contactNumber" 
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Chat with (Optional)</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter the person to chat with" 
              name="chatWith"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            <Link to='/index/Chat/start/welcome/Chatrix' variant="primary" type="submit" className="w-100"style={{color
              :"white",textDecoration:"none"
            }} >
            Submit
            
            </Link>
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
