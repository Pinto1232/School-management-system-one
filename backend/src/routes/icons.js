const express = require("express");
const router = express.Router();
const iconController = require("../controllers/icons");
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');

router.post("/icons", authenticate, authorize(['admin']), iconController.createIcon);

module.exports = router;
