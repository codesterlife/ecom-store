import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';  // To retrieve passed state

function DirectPayment() {
  const location = useLocation();
  const { product } = location.state || {};  // Get the product passed via navigate
  const { cart } = location.state || {};  // Get cart passed via navigate

  const navigate = useNavigate()

  if (!product) {
    return <Typography variant="h6">No product selected</Typography>;  // Handle if no product is passed
  }

  const handlePayment = () => {
    alert(`Payment successful for ${product.name}`);
    navigate('/')
    // Implement actual payment logic here
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
        onClick={handlePayment}  // Simulate payment
      >
        Make Payment
      </Button>
    </Container>
    
  );
}

export default DirectPayment;
