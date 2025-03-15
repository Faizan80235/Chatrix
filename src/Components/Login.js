
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handelerror, handelSucees } from '../Utils/Utils';
import { ToastContainer } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      handelerror('Email is required');
      return;
    }

    try {
      // ✅ Check user exist or not by email (custom backend API)
      const response = await fetch(`http://127.0.0.1:5000/api/users?email=${email}`);
      const data = await response.json();

      if (response.ok) {
        handelSucees('Login Successful');
        console.log('User Data:', data);

        // ✅ Save user in localStorage in id form
        localStorage.setItem('user', JSON.stringify(data?.data));

        // ✅ Navigate to chat page
        navigate('/chat');
      } else {
        handelerror(data?.message || 'Login Failed');
      }
    } catch (error) {
      handelerror('Something went wrong');
      console.error(error);
    }
  };

  return (
    <div style={{ backgroundColor: '#003366', minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', color: 'white' }}>
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px' }}>Login</button>
        <ToastContainer />
      </form>
    </div>
  );
}
