import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function DirectPayment() {
  const location = useLocation();
  const { product } = location.state || {};
  const { cart } = location.state || {};

  const navigate = useNavigate()

  if (!product) {
    return <Typography variant="h6">No product selected</Typography>;
  }

  const handlePayment = () => {
    alert(`Payment successful for ${product.name}`);
    navigate('/')
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Payment</Typography>
      <Typography variant="h6">Item: {product.name}</Typography>
      <Typography variant="body1">Price: ${product.price}</Typography>
      <Button
        variant="contained"
        color="success"
        fullWidth
        style={{ marginTop: '20px' }}
        onClick={handlePayment}
      >
        Make Payment
      </Button>
    </Container>
    
  );
}

export default DirectPayment;
