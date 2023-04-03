const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');


const allowedRolesCourses = ['teacher', 'admin', 'student'];


// Route grouping
router.route('/')
    .post(authenticate, authorize(allowedRolesCourses), courseController.createCourse)
    .get(authenticate, authorize(allowedRolesCourses), courseController.getAllCourses);

router.route('/:id')
    .get(authenticate, authorize(allowedRolesCourses), courseController.getCourseById)
    .put(authenticate, authorize(allowedRolesCourses), courseController.updateCourse)
    .delete(authenticate, authorize(allowedRolesCourses), courseController.deleteCourse);

module.exports = router;
