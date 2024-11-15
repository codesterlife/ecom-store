import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { username, password });
      localStorage.setItem('user', username);
      navigate('/');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px'}}>
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth /> <br /><br />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth /><br /><br />
        <Button type="submit" variant="contained" color="success">
          Login
        </Button>
        <p>Do not have an account? <Link to="/register">Register</Link></p>
      </form>
    </Container>
  );
}

export default Login;
