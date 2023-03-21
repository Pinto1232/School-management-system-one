const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event');

router.route('/')
    .post(eventController.createEvent)
    .get(eventController.getAllEvents);

router.route('/:id')
    .get(eventController.getEventById)
    .put(eventController.updateEvent)
    .delete(eventController.deleteEvent);

module.exports = router;
