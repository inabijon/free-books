const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    file: { 
        type: String, 
        required: true 
    },
    bookSize: {
        type: Number
    },
    published: {
        type: Date,
        default: Date.now(),
    },
    categoryName: {
        type: String,
    }
})

const Book = mongoose.model("Book", bookSchema);

exports.Book = Book;