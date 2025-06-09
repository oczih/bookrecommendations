import mongoose from 'mongoose';
import Person from './models/personmodel.js';
import dotenv from 'dotenv';
import Book from './models/bookmodel.js';
dotenv.config();

const showPeopleWithIds = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const people = await Person.find();

    people.forEach(person => {
      console.log({
        mongoId: person._id.toString(),  // MongoDB ObjectId as string
        originalId: person.originalId,   // Your original numeric ID, if you want
        name: person.name,
        recommendedBooks: person.recommendedBooks.map(bookId => bookId.toString())
      });
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

showPeopleWithIds();

