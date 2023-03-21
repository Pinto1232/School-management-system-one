const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollment');

router.route('/')
    .post(enrollmentController.createEnrollment)
    .get(enrollmentController.getAllEnrollments);

router.route('/:id')
    .get(enrollmentController.getEnrollmentById)
    .put(enrollmentController.updateEnrollment)
    .delete(enrollmentController.deleteEnrollment);

router.route('/student/:studentId')
    .get(enrollmentController.getEnrollmentsByStudentId);

module.exports = router;
