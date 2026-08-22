const express = require('express');
const router = express.Router();
const humanResourceController = require('../controllers/humanResource');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');

router.use(authenticate);
router.use(authorize(['admin']));

router.route('/')
    .post(humanResourceController.createHumanResource)
    .get(humanResourceController.getAllHumanResources);

router.route('/:id')
    .get(humanResourceController.getHumanResourceById)
    .put(humanResourceController.updateHumanResource)
    .delete(humanResourceController.deleteHumanResource);

module.exports = router;
