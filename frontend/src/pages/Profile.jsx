import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

function Profile() {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const username = localStorage.getItem('user');
      if (username) {
        try {
          const response = await axios.get(`http://localhost:5000/api/user/${username}`);
          setUser(response.data.user || {}); // Default to empty object if undefined
          setOrders(response.data.orders || []); // Default to empty array if undefined
        } catch (err) {
          console.error('Failed to fetch profile data', err);
        }
      } else {
        console.error('No username found in localStorage');
      }
    };
    fetchProfile();
  }, []);

  // Show a loading message if user data is not available
  if (!user || Object.keys(user).length === 0) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4">Profile</Typography>
      <Typography variant="h6">Username: {user.username}</Typography>
      <Typography variant="h6">Email: {user.email}</Typography>

      <Typography variant="h5" style={{ marginTop: '20px' }}>Order History</Typography>
      <List>
        {orders.map((order, index) => (
          <ListItem key={index}>
            <ListItemText primary={`Order ${index + 1}: $${order.amount}`} secondary={order.date} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Profile;
