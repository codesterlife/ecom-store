import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const user = localStorage.getItem('user');

  const [cart, setCart] = useState(() => {
    if (user) {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart, user]);

const addToCart = (product) => {
  setCart((prevCart) => {

    const existingProduct = prevCart.find((item) => item._id === product._id);

    if (existingProduct) {

      return prevCart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {

      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
};

const decreaseQuantity = (productId) => {
  setCart((prevCart) => {
    const updatedCart = prevCart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter((item) => item.quantity > 0);

    return updatedCart;
  });
};


const removeFromCart = (productId) => {
  setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
};

  const clearCart = () => {
    setCart([]);
    if (user) {
      localStorage.removeItem('cart');
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
