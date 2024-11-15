const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/get-product', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send('Error fetching products');
  }
});

router.get('/get-product/:productId', async (req, res) => {
  try {
    const products = await Product.findById(req.params.productId);
    res.json(products);
  } catch (err) {
    res.status(500).send(`Error fetching product of ID ${req.params.productId}`);
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

router.put('/:productId', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:productId', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
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
