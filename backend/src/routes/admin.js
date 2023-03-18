const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const { login } = require('../controllers/admin');


const allowedRoles = ['admin'];


router.post('/login', adminController.login);

router.route('/')
    .post(adminController.createAdmin)
    .get(authenticate, authorize(allowedRoles), adminController.getAllAdmins);

router.route('/:id')
    .get(authenticate, authorize(allowedRoles), adminController.getAdminById)
    .put(authenticate, authorize(allowedRoles), adminController.updateAdmin)
    .delete(authenticate, authorize(allowedRoles), adminController.deleteAdmin);

module.exports = router;
