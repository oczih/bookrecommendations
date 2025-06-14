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
    personSuggesting: p.personSuggesting,
    image: p.image,
    likes: p.likes,
    accepted: p.accepted
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
    personSuggesting: p.personSuggesting,
    image: p.image,
    likes: p.likes,
    accepted: p.accepted
  };
};
export const addPerson = async (entry) => {
  try {
    const bookDocs = await Book.find({ title: { $in: entry.recommendedBooks } });
    console.log('Books found:', bookDocs);
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
  const person = await Person.findById(id);
  if (!person) return null;
  const updatableFields = [
    'name',
    'socialMedia',
    'recommendedBooks',
    'image',
    'personSuggesting',
    'recommendedBy',
    'likes',
    'accepted'
  ];

  updatableFields.forEach(field => {
    if (data[field] !== undefined) {
      person[field] = data[field];
    }
  });
  if (person.likes >= 20) {
    person.accepted = true;
  }
  await person.save();

  return {
    mongoId: person._id.toString(),
    originalId: person.originalId,
    name: person.name,
    image: person.image,
    recommendedBooks: person.recommendedBooks.map(bid => bid.toString()),
    personSuggesting: person.personSuggesting,
    likes: person.likes,
    accepted: person.accepted
  };
};
