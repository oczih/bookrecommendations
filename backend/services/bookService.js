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

export const updateBook= async (id, data) => {
  const updatedBook = await Book.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!updatedBook) return null;

  return {
    mongoId: updatedBook._id.toString(),
    originalId: updatedBook.originalId,
    title: updatedBook.title,
    author: updatedBook.author,
    year: updatedBook.year,
    image: updatedBook.image,
    personSuggesting: updatedBook.personSuggesting,
    recommendedBy: updatedBook.recommendedBy.map(bid => bid.toString()),
    likes: updatedBook.likes
  };
};
