import mongoose from 'mongoose'


const schema = mongoose.Schema({
    title: String,
  author: String,
  year: Number,
  description: String,
  recommendedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
  originalId: {
    type: Number,
    required: true,
    unique: true,
  },
  image: String
})


schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const Book = mongoose.model('Book', schema)
export default Book