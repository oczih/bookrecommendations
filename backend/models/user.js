import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    suggestedBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    suggestedPeople: [
    {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person'
    }
    ]
});


userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

const User = mongoose.model('User', userSchema)

export default User