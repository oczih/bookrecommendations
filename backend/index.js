import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import BooksRouter from './routes/books.js';
import PeopleRouter from './routes/people.js';
import loginRouter from './routes/login.js'
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors())

app.use('/api/books', BooksRouter);
app.use('/api/people', PeopleRouter);
app.use('/api/login', loginRouter)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



console.log('Connecting to MongoDB...');
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    })





