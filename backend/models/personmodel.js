import mongoose from 'mongoose'


const schema = mongoose.Schema({
  name: String,
  socialMedia: [
    {
      platform: String,
      followers: Number,
      link: String
    }
  ],
  recommendedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  personSuggesting: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  image: String,
  likes: {type: Number, default: 0},
  accepted: {type: Boolean, default: false}
});


schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const Person = mongoose.model('Person', schema)
export default Person