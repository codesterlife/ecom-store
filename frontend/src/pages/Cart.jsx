// src/pages/Cart.js
import React from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { useCart } from '../context/CartContext';  // Use Cart context
import { useNavigate } from 'react-router-dom';  // To navigate to payment page

function Cart() {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart} = useCart();  // Access cart and removeFromCart functions
  const navigate = useNavigate();  // Hook for navigation

  const handleRemoveItem = (id) => {
    removeFromCart(id);  // Call remove function with the specific product's id
  };

  const handleDecreaseQuantity = (id) => {
    decreaseQuantity(id); // Call the decreaseQuantity function
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
              <p>Quantity: {item.quantity}</p>&nbsp;&nbsp;
              <Button 
                onClick={() => addToCart(item)}
                variant="contained" 
                color="inherit"
              >+</Button>&nbsp;
              <Button 
                onClick={() => handleDecreaseQuantity(item.id)} 
                variant="contained" 
                color="inherit"
              >-</Button>&nbsp;
              <Button 
                onClick={ () => handleRemoveItem(item.id) } 
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
