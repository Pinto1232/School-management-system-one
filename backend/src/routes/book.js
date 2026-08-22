const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');
const { ALL_SCHOOL_ROLES, SCHOOL_MANAGEMENT } = require('../security/roles');

router.use(authenticate);

// Use the uploadCoverImage middleware for the POST /api/books route
router.route('/')
    .post(authorize(SCHOOL_MANAGEMENT), bookController.uploadCoverImage, bookController.createBook)
    .get(authorize(ALL_SCHOOL_ROLES), bookController.getAllBooks);

router.route('/:id')
    .get(authorize(ALL_SCHOOL_ROLES), bookController.getBookById)
    .put(authorize(SCHOOL_MANAGEMENT), bookController.updateBook)
    .delete(authorize(SCHOOL_MANAGEMENT), bookController.deleteBook);


module.exports = router;
