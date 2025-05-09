const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const product = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(product);
    } catch (err) {
        console.error('Error fetching produce:', err);
        res.status(500).json({ message: 'Error fetching produce', error: err.message });
    }
});


router.post('/', async (req, res) => {
    try {
        const productData = req.body;

        if (!productData.productName || typeof productData.productName !== 'string' || productData.productName.length < 2) {
            return res.status(400).json({ message: 'Product Name is required and must be a string with at least 2 characters.' });
        }
        if (!productData.category || typeof productData.category !== 'string' || productData.category.length < 2) {
            return res.status(400).json({ message: 'Category is required and must be a string with at least 2 characters.' });
        }
        if (productData.price === undefined || typeof productData.price !== 'number' || productData.price < 0) {
            return res.status(400).json({ message: 'Price is required and must be a non-negative number.' });
        }
        if (productData.quantity === undefined || typeof productData.quantity !== 'number' || productData.quantity < 0) {
            return res.status(400).json({ message: 'Quantity is required and must be a non-negative number.' });
        }
        if (!productData.productColor || typeof productData.productColor !== 'string' || productData.productColor.length < 2) {
            return res.status(400).json({ message: 'Product Color is required and must be a string with at least 2 characters.' });
        }

        if (!productData.image || typeof productData.image !== 'object' || !productData.image.data || !(productData.image.data instanceof Buffer) || !productData.image.contentType || typeof productData.image.contentType !== 'string') {
            return res.status(400).json({ message: 'Image data and contentType are required and must be a Buffer and a string respectively.' });
        }

        const newProduct = new Product(productData); 
        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    } catch (err) {
        console.error('Error creating product:', err); 
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(el => el.message);
            res.status(400).json({ message: 'Validation Error', errors: errors });
        } else {
            res.status(500).json({ message: 'Error creating product', error: err.message });
        }
    }
});

module.exports = router;