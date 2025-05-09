const express = require('express');
const Product = require('../models/Product');
const Image = require('../models/Image');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { ObjectId } = require('mongoose').Types;

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

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const productData = req.body;


        if (!productData.productName || typeof productData.productName !== 'string' || productData.productName.length < 2) {
            return res.status(400).json({ message: 'Product Name is required and must be a string with at least 2 characters.' });
        }
        if (!productData.category || typeof productData.category !== 'string' || productData.category.length < 2) {
            return res.status(400).json({ message: 'Category is required and must be a string with at least 2 characters.' });
        }
        const price = parseFloat(productData.price);

        if (productData.price === undefined || isNaN(price) || price < 0) {
            return res.status(400).json({ message: 'Price is required and must be a non-negative number.' });
        }
        const quantity = parseInt(productData.quantity);

        if (productData.quantity === undefined || isNaN(quantity) || quantity < 0) {
            return res.status(400).json({ message: 'Quantity is required and must be a non-negative number.' });

        }
        if (!productData.color || typeof productData.color !== 'string' || productData.color.length < 2) {
            return res.status(400).json({ message: 'Color is required and must be a string with at least 2 characters.' });
        }


        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required.' });
        }


        const newImage = new Image({
            data: req.file.buffer,
            contentType: req.file.mimetype,
        });
        const savedImage = await newImage.save();


        const newProduct = new Product({
            productName: productData.productName,
            category: productData.category,
            price: productData.price,
            quantity: productData.quantity,
            color: productData.color,
            image: savedImage._id,
        });
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