const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

const allowedRoles = ['admin', 'teacher'];

// Route grouping
router.route('/')
    .post(authenticate, authorize(allowedRoles), courseController.createCourse)
    .get(authenticate, authorize(allowedRoles), courseController.getAllCourses);

router.route('/:id')
    .get(authenticate, authorize(allowedRoles), courseController.getCourseById)
    .put(authenticate, authorize(allowedRoles), courseController.updateCourse)
    .delete(authenticate, authorize(allowedRoles), courseController.deleteCourse);

module.exports = router;
