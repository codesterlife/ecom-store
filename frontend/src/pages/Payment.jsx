import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 


function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = location.state || {};
  const { clearCart } = useCart();

  if (!cart || cart.length === 0) {
    return <Typography variant="h6">No items in your cart</Typography>;
  }

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayment = () => {
    const username = localStorage.getItem('user');
    if (username) {
        const newOrder = {
          items: cart,
          totalAmount: totalPrice,
          date: new Date().toLocaleString(),
        };

        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        existingOrders.push(newOrder);
        localStorage.setItem(`${username}_orders`, JSON.stringify(existingOrders));
      alert('Payment successful!');
      clearCart();
      navigate('/');
    } else {
    alert('User not logged in!');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <Typography variant="h6">Items in your cart:</Typography>
      {cart.map((item) => (
        <Typography key={item.id} variant="body1">
          {item.name} - ${item.price} x {item.quantity} = ${item.price * item.quantity}
        </Typography>
      ))}
      <Typography variant="h5" style={{ marginTop: '20px' }}>
        Total: ${totalPrice}
      </Typography>
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

export default Payment;
