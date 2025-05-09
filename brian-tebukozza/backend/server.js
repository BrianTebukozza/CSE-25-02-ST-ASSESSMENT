const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');

const app = express();

app.use(cors());
app.use(express.json()); 

const produceRoutes = require('./routes/produce');

connectDB();

app.use('/api/produce', produceRoutes);

app.listen(8000, () => console.log('Server started on port 4000'));
