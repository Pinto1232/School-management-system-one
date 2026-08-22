const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');
const { ALL_SCHOOL_ROLES } = require('../security/roles');

const writeRoles = ['admin', 'teacher', 'staff'];
router.use(authenticate);

router.route('/')
    .post(authorize(writeRoles), eventController.createEvent)
    .get(authorize(ALL_SCHOOL_ROLES), eventController.getAllEvents);

router.route('/:id')
    .get(authorize(ALL_SCHOOL_ROLES), eventController.getEventById)
    .put(authorize(writeRoles), eventController.updateEvent)
    .delete(authorize(writeRoles), eventController.deleteEvent);

module.exports = router;
