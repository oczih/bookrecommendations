import mongoose from 'mongoose';
import Person from './models/personmodel.js'; // Adjust path as needed
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI// Change this!

const updateLikes = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    const result = await Person.updateMany(
      { accepted: { $exists: false } },
      { $set: { accepted: false } }
    );
    console.log('Update result:', result);
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error updating likes:', err);
  }
};

updateLikes();
