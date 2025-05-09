const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const productRoutes = require('./routes/product');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



connectDB();

app.use('/api/product', productRoutes);

app.listen(8000, () => console.log('Server started on port 8000'));



