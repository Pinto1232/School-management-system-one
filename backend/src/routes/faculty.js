const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/falculty');

router.route('/')
    .post(facultyController.createFaculty)
    .get(facultyController.getAllFaculties);

router.route('/:id')
    .get(facultyController.getFacultyById)
    .put(facultyController.updateFaculty)
    .delete(facultyController.deleteFaculty);

module.exports = router;
