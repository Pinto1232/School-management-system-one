const express = require('express');
const router = express.Router();
const packagesController = require('../controllers/packages');
const multer = require("multer");
const upload = multer();

router
  .route("/")
  .post(upload.single("image"), packagesController.createPackage)
  .get(packagesController.getAllPackages);

router.route('/:id')
    .get(packagesController.getPackageById)
    .put(packagesController.updatePackage)
    .delete(packagesController.deletePackage);

module.exports = router;