const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroom');

router.route('/')
    .post(classroomController.createClassroom)
    .get(classroomController.getAllClassrooms);

router.route('/:id')
    .get(classroomController.getClassroomById)
    .put(classroomController.updateClassroom)
    .delete(classroomController.deleteClassroom);

module.exports = router;
