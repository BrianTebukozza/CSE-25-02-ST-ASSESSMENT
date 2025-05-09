const mongoose = require('mongoose');

const produceSchema = new mongoose.Schema({
    productName: { type: String, required: true, trim: true},
    category: { type: String,required: true, trim: true},
    price: { type: Number, required: true, trim: true},
    quantity: { type: Number, required: true, trim: true},
    image: {type: Image, required: true}

},
    {
        timestamps: true, 
    }
);

module.exports = mongoose.model('Product', produceSchema);












const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  data: {
    type: Buffer,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  altText: {
     type: String
  }
});

const Image = mongoose.model('ImageData', imageSchema);