const express = require('express');
const Produce = require('../models/Produce');

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