import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { handelerror, handelSucees } from '../Utils/Utils';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [info, setInfo] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (!info.name || !info.email) {
      handelerror("Please fill in all fields");
      return;
    }

    try {
      // API call to create user
      const response = await fetch('http://127.0.0.1:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
      });

      const data = await response.json();

      if (response.ok) {
        handelSucees("Registered Successfully");

        // ✅ Save user data with _id for future use (e.g., chat)
        localStorage.setItem('user', JSON.stringify(data.data));

        // ✅ Redirect to chat page
        navigate('/chat');
      } else {
        handelerror(data?.message || "Registration Failed");
      }
    } catch (error) {
      handelerror("Something went wrong, please try again later");
    }
  };

  return (
    <div style={{ backgroundColor: '#003366', minHeight: '100vh' }}>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Form
          className="p-4 bg-dark rounded w-100"
          style={{ maxWidth: '400px' }}
          onSubmit={handleSubmit}
        >
          <h2 className="text-white text-center mb-4">Welcome to Chatrix</h2>

          {/* Full Name */}
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={info.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={info.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            className="w-100"
            disabled={!(info.name && info.email)} // Disable button if empty
          >
            Register
          </Button>

          {/* Toast Notifications */}
          <ToastContainer />
        </Form>
      </Container>
    </div>
  );
}
