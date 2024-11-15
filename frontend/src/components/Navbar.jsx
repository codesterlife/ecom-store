import { React, useState } from 'react';
import { AppBar, Toolbar, Button, Typography, TextField, IconButton, Box} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const navigate = useNavigate();
  const { clearCart } = useCart();
  const user = localStorage.getItem('user');

  const handleLogout = () => {

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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Search"
            variant="standard"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ marginRight: 2, color: 'bisque', input: { color: 'bisque' } }}
            InputLabelProps={{
              style: { color: 'bisque' },
            }}
          />
          <IconButton color="inherit" onClick={handleSearchSubmit}>
            <SearchOutlinedIcon />
          </IconButton>
        </Box>
        <Button color="inherit" style={{ fontWeight: 'bold' }} component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" style={{ fontWeight: 'bold' }} component={Link} to="/cart">
          Cart
        </Button>
        {user ? (
          <>
            {user === 'codester' && (
              <Button component={Link} style={{ fontWeight: 'bold' }} to="/user-list" color="inherit">Users</Button>
            )}
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
