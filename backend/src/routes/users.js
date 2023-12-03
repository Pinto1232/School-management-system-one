const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/users');
const upload = require('../middlewares/multer');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const saltRounds = 10;

router.post('/register', upload.single('profileImage'), async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    console.log(req.file);
    console.log(req.body);

    try {

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        // extract the file path relative to the public directory
        const imagePath = req.file.path.split('uploads')[1];


        // create a neew user instance
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            image: `uploads${imagePath}`
        });

        //Save the user to the database
        await newUser.save();

        // Send a response to the client
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                profileImage: newUser.profileImage
            }
        });
    } catch (error) {
        console.error("Full error details:", error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});




// Route for user login
router.post('/login', login);

module.exports = router;
