import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      await axios.post('http://localhost:5000/auth/register', { username, email, password });
      navigate('/login');
    } catch (error) {
      console.log(error)
      alert('Registration failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px'}}>
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth /><br /><br />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth /><br /><br />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth /><br /><br />
        <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} fullWidth /><br /><br />
        <Button type="submit" variant="contained" color="success">
          Register
        </Button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </Container>
  );
}

export default Register;
