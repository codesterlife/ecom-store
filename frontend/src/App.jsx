import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';  // Import CartProvider
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import AddItem from './pages/AddItem';
import Navbar from './components/Navbar';
import Payment from './pages/Payment';
import DirectPayment from './pages/DirectPayment';
import EditItem from './pages/EditItem';
import ProductList from './pages/ProductList';
import { Typography } from '@mui/material';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div style={{ paddingTop: '64px' }}></div>
        <Typography variant="h3" style={{fontFamily: 'Fira Code', fontWeight: 'bold', textAlign: 'center'}}>E-COM Store.</Typography>
        <Typography variant="h6" style={{fontFamily: 'Fira Code', fontWeight: 'bold', textAlign: 'center'}}>The Quick Shop for the Quick People.</Typography><br /><br />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/edit-item/:productId" element={<EditItem />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/paymentdirect" element={<DirectPayment />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
