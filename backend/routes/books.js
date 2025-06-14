import express from 'express';
import * as bookService from '../services/bookService.js';
const router = express.Router();
import Book from '../models/bookmodel.js';
import Person from '../models/personmodel.js'
import tokenExtractor from '../middleware/tokenextractor.js'
import User from '../models/user.js'
// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await bookService.getEntries();
    res.json(books);
  } catch (error) {
    console.error('Failed to fetch books:', error);
    res.status(500).send({ error: 'Failed to fetch books' });
  }
});

// Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await bookService.getByBooksId(req.params.id);
    if (!book) {
      return res.status(404).send({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

// Require the tokenExtractor middleware here
router.post('/', tokenExtractor, async (req, res) => {
  const book = new Book(req.body);
  const { recommendedBy } = req.body;

  if (!book || !book.title || !book.author || !book.year || !book.recommendedBy || !book.description || !book.image) {
    return res.status(400).send({ error: 'Title, author, year, recommendedBy, description, and image are required' });
  }
  // ✅ Get the user ID from the token
  const userId = req.decodedToken.id;

  // Attach the userId to personSuggesting
  book.personSuggesting = [userId];

  try {
    const savedBook = await book.save();

    console.log('RecommendedBy:', recommendedBy);
    console.log('Saved Book ID:', savedBook._id);

    await Person.updateMany(
      { _id: { $in: recommendedBy } },
      { $push: { recommendedBooks: savedBook._id } }
    );

    // ✅ Update the correct user using the extracted ID
    await User.updateOne(
      { _id: userId },
      { $push: { suggestedBooks: savedBook._id } }
    );

    console.log('Book saved:', savedBook);
    res.status(201).send(savedBook);
  } catch (error) {
    console.error('Failed to save book:', error);
    res.status(500).send({ error: 'Failed to save book' });
  }
});



// Update book
router.put('/:id', async (req, res) => {
  try {
    const book = await bookService.updateBook(req.params.id, req.body);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book); // FIXED: should return the updated book
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

export default router;
