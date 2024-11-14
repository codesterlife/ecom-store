const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send('Error fetching products');
  }
});

router.post('/add-product', async (req, res) => {
  try {
    const { name, price, category, image } = req.body;
    const newProduct = new Product({ name, price, category, image });
    await newProduct.save();
    res.status(201).send('Product added');
  } catch (err) {
    res.status(500).send('Error adding product');
  }
});

// PUT request to update product by ID
router.put('/products/:productId', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId, // The productId from URL params
      req.body, // The updated product data from the request body
      { new: true } // This ensures the updated product is returned
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product); // Return the updated product
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE - Remove product by ID
router.delete('/products/:productId', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router;
