import mongoose from 'mongoose';
import Book from './models/bookmodel.js';
import Person from './models/personmodel.js';
import booksData from './data/books.js';
import peopleData from './data/people.js';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB.');

    // Clear collections
    await Book.deleteMany({});
    await Person.deleteMany({});
    console.log('🧹 Cleared existing books and people.');

    // Insert people WITHOUT recommendedBooks, but keep original numeric ID as originalId
    const peopleToInsert = peopleData.map(({ id, recommendedBooks, ...rest }) => ({
      ...rest,
      recommendedBooks: [],
      originalId: id, // Keep original ID for mapping later
    }));

    const insertedPeople = await Person.insertMany(peopleToInsert);
    console.log(`👥 Inserted ${insertedPeople.length} people.`);

    // Create map from original person id (number) to new _id (ObjectId)
    const personIdMap = {};
    insertedPeople.forEach(p => {
      personIdMap[p.originalId] = p._id;
    });

    // Map books: replace recommendedBy (array of person ids) with ObjectIds
    const booksToInsert = booksData.map(book => ({
  ...book,
  recommendedBy: book.recommendedBy.map(pid => personIdMap[pid]).filter(Boolean),
  originalId: book.id,  // store numeric ID from original data
}));

const insertedBooks = await Book.insertMany(booksToInsert);

// map from original numeric book ID to ObjectId
const bookIdMap = {};
insertedBooks.forEach(b => {
  bookIdMap[b.originalId] = b._id;
});

// update people recommendedBooks with ObjectIds from map
for (const person of insertedPeople) {
  const originalPerson = peopleData.find(p => p.id === person.originalId);
  if (!originalPerson) continue;

  const recommendedBooksIds = originalPerson.recommendedBooks
    .map(bookId => bookIdMap[bookId])
    .filter(Boolean);

  person.recommendedBooks = recommendedBooksIds;
  await person.save();
  console.log(`Updated person ${person.originalId} with recommendedBooks`, recommendedBooksIds);

}

    await mongoose.disconnect();
    console.log('✅ Database seeding completed and disconnected.');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

seedDatabase();
