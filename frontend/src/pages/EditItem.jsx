import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const EditItem = () => {
  const { productId } = useParams(); // This should get the 'productId' from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: ''
  });
  
  useEffect(() => {
    // Fetch the product details only if productId is valid
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/products/get-product/${productId}`);
          // Ensure we provide default values if any field is missing
          setProduct({
            name: response.data.name || '',
            price: response.data.price || '',
            category: response.data.category || '',
            image: response.data.image || ''
          });
        } catch (error) {
          console.error('Failed to fetch product:', error);
        }
      };

      fetchProduct();
    } else {
      console.error('Invalid productId:', productId);
    }
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Make sure the productId is not undefined
    if (!productId) {
      console.error('Product ID is missing!');
      return;
    }
  
    try {
      // Send the PUT request to update the product
      const response = await axios.put(`http://localhost:5000/products/${productId}`, product);
      
      alert('Product updated successfully!');
      navigate('/'); // Redirect to home page after successful update
    } catch (error) {
      console.error('Failed to update product:', error.response || error);
      alert('Error updating product');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem', backgroundColor: 'white', borderRadius: '12px', padding: '30px'}} >
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          label="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Image URL"
          name="image"
          value={product.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Box display="flex" justifyContent="space-between" marginTop="1rem">
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Product
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditItem;
