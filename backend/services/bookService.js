import books from '../data/books.js'
import Book from '../models/bookmodel.js'
import mongoose from 'mongoose';

export const getEntries = async () => {
    const books = await Book.find().lean();
    return books;
}

export const getByBooksId = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    const book = await Book.findById(id).lean();
    return book || null;
}

export const updateBook = async (id, data) => {
  const book = await Book.findById(id);
  if (!book) return null;

  const updatableFields = [
    'title',
    'author',
    'year',
    'image',
    'personSuggesting',
    'recommendedBy',
    'likes',
    'accepted'
  ];

  updatableFields.forEach(field => {
    if (data[field] !== undefined) {
      book[field] = data[field];
    }
  });

  if (book.likes >= 20) {
    book.accepted = true;
  }

  await book.save();

  return {
    mongoId: book._id.toString(),
    originalId: book.originalId,
    title: book.title,
    author: book.author,
    year: book.year,
    image: book.image,
    personSuggesting: book.personSuggesting,
    recommendedBy: book.recommendedBy.map(bid => bid.toString()),
    likes: book.likes,
    accepted: book.accepted
  };
};

