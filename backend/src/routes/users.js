const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/users');
const upload = require('../middlewares/multer'); 


// Replace with your actual user controller methods
router.post('/register', upload.single('image'), register);
router.post('/login', login);

module.exports = router;
