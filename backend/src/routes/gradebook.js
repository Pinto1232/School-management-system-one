const express = require('express');
const router = express.Router();
const gradebookController = require('../controllers/gradebook');

router.route('/')
    .post(gradebookController.createGradebookEntry)
    .get(gradebookController.getAllGradebookEntries);

router.route('/:id')
    .get(gradebookController.getGradebookEntryById)
    .put(gradebookController.updateGradebookEntry)
    .delete(gradebookController.deleteGradebookEntry);

module.exports = router;
