const { request } = require('express');
const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollment');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize')

const allowedRolesEnrollment = ['teacher', 'admin']

// Route grouping
router.route('/')
    .post(authenticate, authorize(allowedRolesEnrollment), enrollmentController.createEnrollment)
    .get(authenticate, authorize(allowedRolesEnrollment), enrollmentController.getAllEnrollments);

router.route('/:id')
    .get(authenticate, authorize(allowedRolesEnrollment), enrollmentController.getEnrollmentById)
    .put(authenticate, authorize(allowedRolesEnrollment), enrollmentController.updateEnrollment)
    .delete(authenticate, authorize(allowedRolesEnrollment), enrollmentController.deleteEnrollment);

router.route('/student/:studentId')
    .get(enrollmentController.getEnrollmentsByStudentId);

module.exports = router;
