import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { handelerror, handelSucees } from '../Utils/Utils';

function Login() {
  const [info, setInfo] = useState({
    email: '',
    password: '',
    contactNumber: '',
    chatWith: ''
  });

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (!info.email || !info.email || !info.contactNumber  || !info.password || !info.chatWith) {
      handelerror("Error while Registering");
    }
    else {
      handelSucees("Registerd")
    }
    e.preventDefault();
    console.log(info); 
  };

  return (
    <div style={{ backgroundColor: '#003366', minHeight: '100vh' }}>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Form className="p-4" style={{ backgroundColor: '#003366', borderRadius: '8px', width: '100%', maxWidth: '400px' }} onSubmit={handleSubmit}>
          <h2 className="text-white text-center mb-4">Welcome To Chatrix</h2>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              name="email" 
              value={info.email} 
              onChange={handleChange} 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              name="password" 
              value={info.password} 
              onChange={handleChange} 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Contact Number</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter contact number" 
              name="contactNumber" 
              value={info.contactNumber} 
              onChange={handleChange} 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Chat with (Optional)</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter the person to chat with" 
              name="chatWith" 
              value={info.chatWith} 
              onChange={handleChange} 
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
        <ToastContainer />
      </Container>
    </div>
  );
}

export default Login;
