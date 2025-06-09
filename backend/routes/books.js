import express from 'express';
import * as bookService from '../services/bookService.js';
const router = express.Router();
import Book from '../models/bookmodel.js';
router.get('/', async (req, res) => {
try {
        const books = await Book.find();
        res.json(books);
  } catch (error) {
    console.error('Failed to fetch books:', error);
    res.status(500).send({ error: 'Failed to fetch books' });
  }
});

router.get('/:id', (req, res) => {
    const book = bookService.getByBooksId(req.params.id);
    if (!book) {
        return res.status(404).send({ error: 'Book not found' });
    }
    res.send(book);
});

router.post('/', async (req, res) => {
 const book = new Book(req.body)
 if(!book || !book.title || !book.author || !book.year  || !book.recommendedBy  || !book.description) {
   return res.status(400).send({ error: 'Title, author, year, recommendedBy and description are required' });
 }
 book.likes = 0;
 const savedBook = await book.save();
 console.log('Book saved:', savedBook);
 res.status(201).send(savedBook);
})




export default router;

router
