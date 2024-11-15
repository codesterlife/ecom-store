// src/pages/UsersPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem('user');

  // Redirect if the user is not 'codester'
  useEffect(() => {
    if (username !== 'codester') {
      navigate('/'); // Redirect to home if not 'codester'
    }
  }, [username, navigate]);

  useEffect(() => {
    // Fetch all users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/users'); // Replace with your API endpoint
        setUsers(response.data.users);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Registered Users</Typography>
      <List>
        {users.map((user, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={user.username}
              secondary={`Email: ${user.email}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default UserList;
