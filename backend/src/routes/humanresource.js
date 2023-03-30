const express = require('express');
const router = express.Router();
const humanResourceController = require('../controllers/humanResource');

router.route('/')
    .post(humanResourceController.createHumanResource)
    .get(humanResourceController.getAllHumanResources);

router.route('/:id')
    .get(humanResourceController.getHumanResourceById)
    .put(humanResourceController.updateHumanResource)
    .delete(humanResourceController.deleteHumanResource);

module.exports = router;
