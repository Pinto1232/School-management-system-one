const express = require('express');
const router = express.Router();
const campusSafetyController = require('../controllers/campussafety');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');
const { ALL_SCHOOL_ROLES, SCHOOL_MANAGEMENT } = require('../security/roles');

router.use(authenticate);

router.route('/')
    .post(authorize(SCHOOL_MANAGEMENT), campusSafetyController.createCampus)
    .get(authorize(ALL_SCHOOL_ROLES), campusSafetyController.getAllCampuses);

router.route('/:id')
    .get(authorize(ALL_SCHOOL_ROLES), campusSafetyController.getCampusById)
    .put(authorize(SCHOOL_MANAGEMENT), campusSafetyController.updateCampus)
    .delete(authorize(SCHOOL_MANAGEMENT), campusSafetyController.deleteCampus);

module.exports = router;
