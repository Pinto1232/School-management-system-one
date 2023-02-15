const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
    bookID: {
        type: String,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    numberOfCopies: {
        type: Number,
        required: true
    },
    availableCopies: {
        type: Number,
        required: true
    }
});

const Library = mongoose.model("Library", librarySchema);

const createLibrary = async (bookID, bookTitle, author, ISBN, publicationDate, category, numberOfCopies, availableCopies) => {
    const library = new Library({
        bookID,
        bookTitle,
        author,
        ISBN,
        publicationDate,
        category,
        numberOfCopies,
        availableCopies
    });

    try {
        const result = await library.save();
        console.log(result);
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = createLibrary;