const express = require('express');
const router = express.Router();
const sportsController = require('../controllers/sports');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');
const { ALL_SCHOOL_ROLES } = require('../security/roles');

const writeRoles = ['admin', 'teacher', 'staff'];
router.use(authenticate);

router.route('/')
    .get(authorize(ALL_SCHOOL_ROLES), sportsController.getAllSports)
    .post(authorize(writeRoles), sportsController.createSport);

router.route('/:id')
    .get(authorize(ALL_SCHOOL_ROLES), sportsController.getSportById)
    .put(authorize(writeRoles), sportsController.updateSport)
    .delete(authorize(writeRoles), sportsController.deleteSport);

router.route('/:id/playerImage')
    .put(authorize(writeRoles), sportsController.uploadPlayerImage, sportsController.addPlayerImageToSport);

module.exports = router;
