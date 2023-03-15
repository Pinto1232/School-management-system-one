const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

const allowedRoles = ['admin', 'teacher'];

// POST and GET routes for '/'
router.post('/', authenticate, authorize(allowedRoles), attendanceController.createAttendance);
router.get('/', authenticate, authorize(allowedRoles), attendanceController.getAllAttendance);

// GET, PUT, and DELETE routes for '/:id'
router.get('/:id', authenticate, authorize(allowedRoles), attendanceController.getAttendanceById);
router.put('/:id', authenticate, authorize(allowedRoles), attendanceController.updateAttendance);
router.delete('/:id', authenticate, authorize(allowedRoles), attendanceController.deleteAttendance);

module.exports = router;
