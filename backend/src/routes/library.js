const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/library');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');
const { ALL_SCHOOL_ROLES, SCHOOL_MANAGEMENT } = require('../security/roles');

router.use(authenticate);

router
  .route('/')
  .get(authorize(ALL_SCHOOL_ROLES), libraryController.getAllLibraries)
  .post(authorize(SCHOOL_MANAGEMENT), libraryController.createLibrary);

router
  .route('/:id')
  .get(authorize(ALL_SCHOOL_ROLES), libraryController.getLibraryById)
  .patch(authorize(SCHOOL_MANAGEMENT), libraryController.updateLibrary)
  .delete(authorize(SCHOOL_MANAGEMENT), libraryController.deleteLibrary);

module.exports = router;
