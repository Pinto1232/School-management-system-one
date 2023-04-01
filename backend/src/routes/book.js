const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');

// Use the uploadCoverImage middleware for the POST /api/books route
router.route('/')
    .post(bookController.uploadCoverImage, bookController.createBook)
    .get(bookController.getAllBooks);

router.route('/:id')
    .get(bookController.getBookById)
    .put(bookController.updateBook)
    .delete(bookController.deleteBook);


module.exports = router;
