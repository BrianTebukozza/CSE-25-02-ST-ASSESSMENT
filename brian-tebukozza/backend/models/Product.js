const mongoose = require('mongoose');
const Image = require('./Image'); 

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true, trim: true},
    category: { type: String,required: true, trim: true},
    price: { type: Number, required: true, trim: true},
    quantity: { type: Number, required: true, trim: true},
    color: { type: String, trim: true },
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Product', productSchema, 'product');