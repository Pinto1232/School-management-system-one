const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/falculty');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');
const { PEOPLE_MANAGERS } = require('../security/roles');

router.use(authenticate);

router.route('/')
    .post(authorize(['admin']), facultyController.createFaculty)
    .get(authorize(PEOPLE_MANAGERS), facultyController.getAllFaculties);

router.route('/:id')
    .get(authorize(PEOPLE_MANAGERS), facultyController.getFacultyById)
    .put(authorize(['admin']), facultyController.updateFaculty)
    .delete(authorize(['admin']), facultyController.deleteFaculty);

module.exports = router;
