import mongoose from 'mongoose'


const schema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  author: String,
  year: Number,
  description: String,
  recommendedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
  personSuggesting: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  image: String,
  likes: Number
});

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const Book = mongoose.model('Book', schema)
export default Book