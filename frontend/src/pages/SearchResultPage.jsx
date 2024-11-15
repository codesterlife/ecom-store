import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, CircularProgress, Container } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';

function SearchResultsPage() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/products/get-product');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch products', err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]);

  if (loading) {
    return (
      <div>
        <CircularProgress />
        <Typography>Loading products...</Typography>
      </div>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Search Results for "<b>{query}</b>"
      </Typography>
      <Grid container spacing={3} sx={{ padding: 3 }}>
        {filteredProducts.length === 0 ? (
          <Typography variant="h6">No products found</Typography>
        ) : (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default SearchResultsPage;
