const express = require("express");
const router = express.Router();
const iconController = require("../controllers/icons");

router.post("/icons", iconController.createIcon);

module.exports = router;
