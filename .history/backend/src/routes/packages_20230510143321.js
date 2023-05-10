const express = require('express');
const router = express.Router();
const packagesController = require('../controllers/packages');
const multer = require("multer");
const upload = multer();



// create a new package with packageImage upload
router
  .route("/packages")
  .post(upload.single("image"), packagesController.createPackage);

// I use the chaining method
router.route('/')
    .get(packagesController.getAllPackages)
    .post(packagesController.createPackage);

router.route('/:id')
    .get(packagesController.getPackageById)
    .put(packagesController.updatePackage)
    .delete(packagesController.deletePackage);

module.exports = router;
