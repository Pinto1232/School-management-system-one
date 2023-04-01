const express = require('express');
const router = express.Router();
const sportsController = require('../controllers/sports');


router.route('/')
    .get(sportsController.getAllSports)
    .post(sportsController.createSport);

router.route('/:id')
    .get(sportsController.getSportById)
    .put(sportsController.updateSport)
    .delete(sportsController.deleteSport);

router.route('/:id/playerImage')
    .put(sportsController.uploadPlayerImage, sportsController.addPlayerImageToSport);

module.exports = router;
