const multer = require('multer');
const Book = require('../models/Book');

// Helper function to handle validation and error messages
const handleErrors = (res, error) => {
    res.status(400).json({ success: false, message: error.message });
};


// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Set up the multer middleware for image uploads
exports.uploadCoverImage = upload.single('coverImage');


// Create a new book
exports.createBook = async (req, res) => {
    try {
        const bookData = {
            ...req.body,
            coverImage: req.file ? req.file.path : req.body.coverImageUrl,
        };

        if (!bookData.coverImage) {
            throw new Error("Either cover image file or cover image URL is required");
        }

        const book = new Book(bookData);
        await book.save();
        res.status(201).json({ success: true, data: book });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ success: true, data: books });
    } catch (error) {
        handleErrors(res, error);
    }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        handleErrors(res, error);
    }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        handleErrors(res, error);
    }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(204).json({ success: true, data: null });
    } catch (error) {
        handleErrors(res, error);
    }
};