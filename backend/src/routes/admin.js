const express = require('express');
const adminController = require('../controllers/admin');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');

const router = express.Router();
const adminOnly = [authenticate, authorize(['admin'])];

router.post('/register', ...adminOnly, adminController.createAdmin);
router.route('/all').get(...adminOnly, adminController.getAllAdmins);
router.route('/')
  .post(...adminOnly, adminController.createAdmin)
  .get(...adminOnly, adminController.getAllAdmins);
router.route('/:id')
  .get(...adminOnly, adminController.getAdminById)
  .put(...adminOnly, adminController.updateAdmin)
  .delete(...adminOnly, adminController.deleteAdmin);

module.exports = router;
