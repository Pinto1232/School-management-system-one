const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroom');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');

const allowRolesClassroom = ['admin', 'teacher'];

router.route('/')
    .post(authenticate, authorize(allowRolesClassroom), classroomController.createClassroom)
    .get(authenticate, authorize(allowRolesClassroom), classroomController.getAllClassrooms);

router.route('/:id')
    .get(authenticate, authorize(allowRolesClassroom), classroomController.getClassroomById)
    .put(authenticate, authorize(allowRolesClassroom), classroomController.updateClassroom)
    .delete(authenticate, authorize(allowRolesClassroom), classroomController.deleteClassroom);

module.exports = router;
