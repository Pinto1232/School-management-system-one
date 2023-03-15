const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

const allowedRoles = ['admin', 'teacher'];

router.route('/')
    .post(authenticate, authorize(allowedRoles), studentController.createStudent)
    .get(authenticate, authorize(allowedRoles), studentController.getAllStudents);

router.route('/:id')
    .get(authenticate, authorize(allowedRoles), studentController.getStudentById)
    .put(authenticate, authorize(allowedRoles), studentController.updateStudent)
    .delete(authenticate, authorize(allowedRoles), studentController.deleteStudent);

module.exports = router;
