import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function Login() {


  return (
    <div style={{ backgroundColor: '#003366', minHeight: '100vh' }}>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Form  className="p-4" style={{ backgroundColor: '#003366', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
          <h2 className="text-white text-center mb-4">Login</h2>

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
              placeholder="Enter contact number which person chat you" 
              name="contactNumber" 
              required
            />
          </Form.Group>

       

          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
