const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        trim: true,
    },
    publicationDate: {
        type: Date,
        required: [true, 'Publication date is required'],
    },
    publisher: {
        type: String,
        required: [true, 'Publisher is required'],
        trim: true,
    },
    pageCount: {
        type: Number,
        required: [true, 'Page count is required'],
    },
    description: {
        type: String,
        trim: true,
    },
    coverImage: {
        type: String,
        /* required: [true, 'Cover image is required'], */
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
