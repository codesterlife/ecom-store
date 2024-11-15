// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const user = localStorage.getItem('user');

  // Initialize cart state from localStorage if available
  const [cart, setCart] = useState(() => {
    if (user) {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Sync cart state with localStorage
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));  // Store cart in localStorage
    } else {
      localStorage.removeItem('cart');  // Clear cart from localStorage when empty
    }
  }, [cart, user]);

// Function to add an item to the cart
const addToCart = (product) => {
  setCart((prevCart) => {
    // Check if the product already exists in the cart using its `id`
    const existingProduct = prevCart.find((item) => item._id === product._id);

    if (existingProduct) {
      // If the product exists, increase the quantity for that product
      return prevCart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // If the product is new (not in cart), add it with quantity 1
      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
};

// Function to decrease the quantity of a specific item in the cart
const decreaseQuantity = (productId) => {
  setCart((prevCart) => {
    const updatedCart = prevCart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter((item) => item.quantity > 0); // Remove items with quantity 0

    return updatedCart;
  });
};

// Function to remove a specific item from the cart
const removeFromCart = (productId) => {
  setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
};


  // Clear the cart (to be called on logout)
  const clearCart = () => {
    setCart([]);  // Clear cart in state
    if (user) {
      localStorage.removeItem('cart');  // Clear cart from localStorage if logged in
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
