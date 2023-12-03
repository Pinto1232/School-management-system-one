const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/users');
const upload = require('../middlewares/multer');

/* router.post('/register', upload.single('profileImage'), register); */
router.post('/register', upload.single('profileImage'), (req, res) => {
    console.log(req.file); 
    console.log(req.body);
    // Registration logic...
});




// Route for user login
router.post('/login', login);

module.exports = router;
