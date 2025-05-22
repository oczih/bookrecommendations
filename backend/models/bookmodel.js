const mongoose = require('mongoose')


const schema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    categories: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


schema.set()