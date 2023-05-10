const express = require('express');
const router = express.Router();
const packagesController = require('../controllers/packages');

// I use the chaining method
router.route('/')
    .get(packagesController.getAllPackages)
    .post(packagesController.createPackage);

router.route('/:id')
    .get(packagesController.getPackageById)
    .put(packagesController.updatePackage)
    .delete(packagesController.deletePackage);

module.exports = router;
