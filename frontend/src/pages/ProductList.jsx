import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Grid, Card, CardMedia, CardContent, Typography, CardActions, Container } from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products/get-product');
        setProducts(response.data);  // Assuming the API returns an array of products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle delete request
  const handleRemove = async (productId) => {
    try {
      console.log('Attempting to delete product with ID:', productId); // Log product ID
      
      // Send DELETE request to server
      const response = await axios.delete(`http://localhost:5000/products/${productId}`);
      
      // Remove the product from the state on success
      setProducts(products.filter(product => product._id !== productId));
  
      window.alert('Product removed successfully.');

    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please check if the product ID exists.');
    }
  };
  
  return (
    <Container>
      <h2>Product List</h2>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item key={product._id} xs={5} sm={6} md={3}>
            <Card>
                <CardMedia component="img" height="200" image={product.image} alt={product.name} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.category} - ${product.price}
                        </Typography>
                    </CardContent>
                <CardActions>
                {/* Edit button */}
                <Link to={`/edit-item/${product._id}`}>
                  <Button size="small" variant='contained' color="warning">Edit</Button>
                </Link>
                {/* Delete button */}
                <Button size="small" variant='contained' color="error" onClick={() => handleRemove(product._id)}>Delete</Button>
                </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
