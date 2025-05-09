const mongoose = require('mongoose');

const produceSchema = new mongoose.Schema({
    productName: { type: String, required: true, trim: true},
    category: { type: String,required: true, trim: true},
    price: { type: Number, required: true, trim: true},
    quantity: { type: Number, required: true, }
    

},
    {
        timestamps: true, 
    }
);

module.exports = mongoose.model('Produce', produceSchema);