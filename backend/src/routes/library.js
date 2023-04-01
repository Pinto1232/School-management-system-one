const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/library');

router
  .route('/')
  .get(libraryController.getAllLibraries)
  .post(libraryController.createLibrary);

router
  .route('/:id')
  .get(libraryController.getLibraryById)
  .patch(libraryController.updateLibrary)
  .delete(libraryController.deleteLibrary);

module.exports = router;
