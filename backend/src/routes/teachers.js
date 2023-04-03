const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');
const teacherController = require('../controllers/teachers');

const allowedRolesTeacher = ['teacher', 'admin'];

// Teacher controller routes
router.route('/register').post(teacherController.createTeacher);
router.route('/')
  .get(authenticate, authorize(allowedRolesTeacher), teacherController.getAllTeachers);
router.route('/:id')
  .get(authenticate, authorize(allowedRolesTeacher), teacherController.getTeacherById)
  .put(authenticate, authorize(allowedRolesTeacher), teacherController.updateTeacher)
  .delete(authenticate, authorize(allowedRolesTeacher), teacherController.deleteTeacher);

module.exports = router;
