const express = require('express');
const router = express.Router();
const packagesController = require('../controllers/packages');
const multer = require("multer");
const upload = multer();
const authenticate = require('../middlewares/authenticate');
const { withTenantIdentity: authenticateFeedback } = require('../middlewares/authenticateAccessToken');
const { authorize } = require('../middlewares/authorize');

router
  .route("/")
  .post(authenticate, authorize(['platform_admin']), upload.single("image"), packagesController.createPackage)
  .get(packagesController.getAllPackages);

router.get('/feedback', authenticateFeedback, packagesController.getPackageFeedback);
router.put('/:planKey/feedback', authenticateFeedback, packagesController.updatePackageFeedback);

router.route('/:id')
    .get(packagesController.getPackageById)
    .put(authenticate, authorize(['platform_admin']), packagesController.updatePackage)
    .delete(authenticate, authorize(['platform_admin']), packagesController.deletePackage);

module.exports = router;
