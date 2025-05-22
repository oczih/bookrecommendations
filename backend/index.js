const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors())

console.log('Connecting to MongoDB...');
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    })




