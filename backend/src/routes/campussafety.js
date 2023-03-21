const express = require('express');
const router = express.Router();
const campusSafetyController = require('../controllers/campussafety');

router.route('/')
    .post(campusSafetyController.createCampus)
    .get(campusSafetyController.getAllCampuses);

router.route('/:id')
    .get(campusSafetyController.getCampusById)
    .put(campusSafetyController.updateCampus)
    .delete(campusSafetyController.deleteCampus);

module.exports = router;