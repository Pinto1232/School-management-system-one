const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teachers');

router
  .route('/')
  .get(teacherController.getAllTeachers)
  .post(teacherController.createTeacher);

router
  .route('/:id')
  .get(teacherController.getTeacherById)
  .put(teacherController.updateTeacher)
  .delete(teacherController.deleteTeacher);

module.exports = router;
