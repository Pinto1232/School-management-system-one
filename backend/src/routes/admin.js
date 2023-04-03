const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');
const { login } = require('../controllers/admin');

const allowedRolesAdmin = ['admin'];

// Admin controller routes
router.route('/register').post(adminController.createAdmin);
router.route('/login').post(adminController.login);
router.route('/all').get(authenticate, authorize(allowedRolesAdmin), adminController.getAllAdmins);
router.route('/:id')
  .get(authenticate, authorize(allowedRolesAdmin), adminController.getAdminById)
  .put(authenticate, authorize(allowedRolesAdmin), adminController.updateAdmin)
  .delete(authenticate, authorize(allowedRolesAdmin), adminController.deleteAdmin);

router.post('/login', adminController.login);

router.route('/')
    .post(adminController.createAdmin)
    .get(authenticate, authorize(allowedRolesAdmin), adminController.getAllAdmins);

router.route('/:id')
    .get(authenticate, authorize(allowedRolesAdmin), adminController.getAdminById)
    .put(authenticate, authorize(allowedRolesAdmin), adminController.updateAdmin)
    .delete(authenticate, authorize(allowedRolesAdmin), adminController.deleteAdmin);

module.exports = router;
