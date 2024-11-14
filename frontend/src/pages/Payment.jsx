// src/pages/Payment.js
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';  // To retrieve passed state

function Payment() {
  const location = useLocation();
  const { cart } = location.state || {};  // Get cart passed via navigate

  if (!cart) {
    return <Typography variant="h6">No items in your cart</Typography>;  // Handle if no cart is passed
  }

  // Calculate total price of cart
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handlePayment = () => {
    alert('Payment successful!');
    // Implement actual payment logic here (e.g., integrate with Stripe or PayPal)
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <Typography variant="h6">Items in your cart:</Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Your cart is empty</Typography>
      ) : (
        cart.map((item) => (
          <Typography key={item.id} variant="body1">
            {item.name} - ${item.price}
          </Typography>
        ))
      )}
      <Typography variant="h5" style={{ marginTop: '20px' }}>
        Total: ${totalPrice}
      </Typography>
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

export default Payment;
