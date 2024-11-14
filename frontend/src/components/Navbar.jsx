import React from 'react';
import { AppBar, Toolbar, Button, Typography, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    // Clear the cart when logging out
    clearCart();

    localStorage.removeItem('user');

    navigate('/');
  };

  return (
    <AppBar position="fixed" color='secondary'>
      <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1, fontFamily: 'Fira Code', fontWeight: 'bold'}}>
          E-COM Store.
        </Typography>
        <Button color="inherit" style={{ fontWeight: 'bold' }} component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" style={{ fontWeight: 'bold' }} component={Link} to="/cart">
          Cart
        </Button>
        {user ? (
          <>
            {user === 'codester' && (
              <Button color="inherit" style={{ fontWeight: 'bold' }} component={Link} to="/product-list">
                Products
              </Button>
            )}  
            {user === 'codester' && (
              <Button color="inherit" style={{ fontWeight: 'bold' }} component={Link} to="/add-item">
                Add Products
              </Button>
            )}
            <Button color="inherit" style={{ fontWeight: 'bold' }} component={Link} to="/profile">
              Profile
            </Button>          
            <Button color="inherit" style={{ fontWeight: 'bold' }} onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" style={{ fontWeight: 'bold' }} component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
