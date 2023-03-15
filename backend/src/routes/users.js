const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

// Replace with your actual user controller methods
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
