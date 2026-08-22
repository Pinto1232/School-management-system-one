const express = require('express');
const router = express.Router();
const studentTrackingController = require('../controllers/studenttracking');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');
const { ACADEMIC_STAFF } = require('../security/roles');

router.use(authenticate);
router.use(authorize(ACADEMIC_STAFF));

router
    .route('/student-trackings')
    .get(studentTrackingController.getAllStudentTrackings)
    .post(studentTrackingController.createStudentTracking);

router
    .route('/students/:studentId/student-trackings')
    .get(studentTrackingController.getStudentTrackingsByStudentId);

router
    .route('/students/:studentId/student-trackings/:id')
    .put(studentTrackingController.updateStudentTrackingByStudentId)
    .delete(studentTrackingController.deleteStudentTrackingByStudentId);

router
    .route('/student-trackings/:id')
    .get(studentTrackingController.getStudentTrackingById)
    .put(studentTrackingController.updateStudentTracking)
    .delete(studentTrackingController.deleteStudentTracking);

module.exports = router;
