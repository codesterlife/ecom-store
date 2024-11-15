// src/pages/Cart.js
import React from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { useCart } from '../context/CartContext';  // Use Cart context
import { useNavigate } from 'react-router-dom';  // To navigate to payment page
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';

function Cart() {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart} = useCart();  // Access cart and removeFromCart functions
  const navigate = useNavigate();  // Hook for navigation

  const handleRemoveItem = (id) => {
    removeFromCart(id);  // Call remove function with the specific product's id
  };

  const handleDecreaseQuantity = (id) => {
    decreaseQuantity(id); // Call the decreaseQuantity function
  };

  // Function to calculate the total amount
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Proceed to checkout, pass the cart to the payment page
  const handleCheckout = () => {
    navigate('/payment', { state: { cart } });  // Pass entire cart array to the payment page
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Your cart is empty</Typography>
      ) : (
        <List>
          {cart.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.name}
                secondary={`$${item.price}`}
              />
              <IconButton 
                onClick={() => addToCart(item)} 
                color="secondary"
                size="small"
              >
                <AddCircleOutlineSharpIcon />
              </IconButton>&nbsp;
              <b>{item.quantity}</b>&nbsp;&nbsp;
              <IconButton 
                onClick={() => handleDecreaseQuantity(item.id)}  
                color="secondary"
                size="small"
              >
                <RemoveCircleOutlineSharpIcon />
              </IconButton>&nbsp;&nbsp;&nbsp;&nbsp;
              <Button 
                onClick={ () => handleRemoveItem(item._id) } 
                variant="contained" 
                color="error"
              >
                Remove
              </Button>&nbsp;
            </ListItem>
          ))}
        </List>
      )}
      {cart.length > 0 && (
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Total Amount: ${calculateTotalAmount()}
        </Typography>
      )}<br /><br />
      {cart.length > 0 && (
        <Button 
          onClick={ () => handleClearCart() } 
          variant="contained" 
          color="warning"
        >
          Clear Cart
        </Button>
      )}
      {cart.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
          onClick={handleCheckout}  // Navigate to payment page
        >
          Proceed to Checkout
        </Button>
      )}
    </Container>
  );
}

export default Cart;
