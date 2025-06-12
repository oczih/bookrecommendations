import Person from '../models/personmodel.js';
import Book from '../models/bookmodel.js'
export const getEntries = async () => {
  const people = await Person.find().lean();
  return people.map(p => ({
    mongoId: p._id.toString(),
    originalId: p.originalId,
    name: p.name,
    socialMedia: p.socialMedia,
    recommendedBooks: p.recommendedBooks.map(id => id.toString()),
    image: p.image
  }));
};
export const getByPeopleId = async (id) => {
  const p = await Person.findById(id).lean();
  if (!p) return null;
  return {
    mongoId: p._id.toString(),
    originalId: p.originalId,
    name: p.name,
    recommendedBooks: p.recommendedBooks.map(id => id.toString()),
    image: p.image
  };
};
export const addPerson = async (entry) => {
  try {
    const bookDocs = await Book.find({ title: { $in: entry.recommendedBooks } });
    console.log('Books found:', bookDocs);  // <<<<< Add this line to debug
    const bookIds = bookDocs.map(book => book._id);

    const newPerson = new Person({
      ...entry,
      recommendedBooks: bookIds
    });
    return await newPerson.save();
  } catch (error) {
    console.error('Error saving person:', error);
    throw new Error('Failed to add person: ' + error.message);
  }
};
export const updatePerson = async (id, data) => {
  const updatedPerson = await Person.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!updatedPerson) return null;

  return {
    mongoId: updatedPerson._id.toString(),
    originalId: updatedPerson.originalId,
    name: updatedPerson.name,
    picture: updatedPerson.picture,
    recommendedBooks: updatedPerson.recommendedBooks.map(bid => bid.toString()),
    personSuggesting: updatedPerson.personSuggesting
  };
};
