const express = require('express');
const Produce = require('../models/Product');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
    const produce = await Produce.find().sort({ createdAt: -1 });
    res.json(produce);
} catch (err) {
    console.error("Error fetching produce:", err);
    res.status(500).json({message: 'Error fetching produce', error: err.message});
}
});

router.post('/', async (req, res) => {
    try {
        const produceData = req.body;

        if (!produceData.productName || produceData.productName.length < 2) {
             return res.status(400).json({ message: 'Product Name is required and must be at least 2 characters.' });
        }
         if (!produceData.category || produceData.category.length < 2) { 
             return res.status(400).json({ message: 'Category is required and must be at least 2 characters.' });
         }

          if (produceData.price === null || produceData.cost === undefined || produceData.price < 0) {
             return res.status(400).json({ message: 'Price is required and must be a non-negative number.' });
         }
        
         if (produceData.quantity === null || produceData.quantity === undefined || produceData.quantity < 0) {
             return res.status(400).json({ message: 'Quantity is required and must be a non-negative number.' });
         }
        }

   
    );



module.exports = router;