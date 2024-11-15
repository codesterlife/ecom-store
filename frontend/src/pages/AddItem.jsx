import React, { useState } from 'react';
import { Container, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddItem() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/products/add-product', { name, price, category, image });
      alert('Product added successfully');
      navigate('/');
    } catch (err) {
      alert('Error adding product');
    }
  };

  return (
    <Container maxWidth="sm">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px'}}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth /><br /><br />
        <TextField label="Price" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth /><br /><br />
        <TextField label="Category" value={category} onChange={(e) => setCategory(e.target.value)} fullWidth /><br /><br />
        <TextField label="Image URL" value={image} onChange={(e) => setImage(e.target.value)} fullWidth /><br /><br />
        <Button type="submit" variant="contained" color="success">
          Add Item
        </Button>
      </form>
    </Container>
  );
}

export default AddItem;
