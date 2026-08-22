const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');


const readRoles = ['admin', 'teacher', 'staff', 'parent', 'student'];
const writeRoles = ['admin', 'teacher'];


// Route grouping
router.route('/')
    .post(authenticate, authorize(writeRoles), courseController.createCourse)
    .get(authenticate, authorize(readRoles), courseController.getAllCourses);

router.route('/:id')
    .get(authenticate, authorize(readRoles), courseController.getCourseById)
    .put(authenticate, authorize(writeRoles), courseController.updateCourse)
    .delete(authenticate, authorize(writeRoles), courseController.deleteCourse);

module.exports = router;
