const express = require('express');
const router = express.Router();
const gradebookController = require('../controllers/gradebook');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');
const { ACADEMIC_STAFF } = require('../security/roles');

router.use(authenticate);
router.use(authorize(ACADEMIC_STAFF));

router.route('/')
    .post(gradebookController.createGradebookEntry)
    .get(gradebookController.getAllGradebookEntries);

router.route('/:id')
    .get(gradebookController.getGradebookEntryById)
    .put(gradebookController.updateGradebookEntry)
    .delete(gradebookController.deleteGradebookEntry);

module.exports = router;
