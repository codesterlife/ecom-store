// src/pages/SearchResultsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, CircularProgress, Container } from '@mui/material';
import ProductCard from '../components/ProductCard';  // Assuming you have a ProductCard component
import { useLocation } from 'react-router-dom';  // Import useLocation to get current URL params

function SearchResultsPage() {
  const location = useLocation();  // Get the location object (contains the current URL and query)
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // To handle loading state
  const searchParams = new URLSearchParams(location.search);  // Use location.search to get the query parameters
  const query = searchParams.get('q');  // Get the search query from the URL parameter

  // Fetch all products when the component first mounts
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get('http://localhost:5000/products/get-product');
        setProducts(response.data);  // Store all fetched products
        setLoading(false);  // Done fetching
      } catch (err) {
        console.error('Failed to fetch products', err);
        setLoading(false);  // Stop loading on error
      }
    };

    fetchProducts();
  }, []); // Fetch products only once on mount

  // Filter products based on the query parameter
  useEffect(() => {
    if (query) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);  // Set filtered results
    } else {
      setFilteredProducts([]);  // No query, show nothing or empty list
    }
  }, [query, products]); // Re-filter products when query or products change

  if (loading) {
    return (
      <div>
        <CircularProgress />  {/* Display loading spinner */}
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
              <ProductCard product={product} />  {/* Assuming ProductCard component */}
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default SearchResultsPage;
