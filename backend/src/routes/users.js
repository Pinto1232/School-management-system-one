const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/users');
const upload = require('../middlewares/multer');
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
router.post('/login', async (req, res) => {
    console.log("Login attempt with:", req.body);
    console.log(req.body);

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`No user found for email: ${email}`);
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await user.comparePassword(password); // Add await here

        if (!isPasswordValid) {
            console.log(`Password mismatch for user: ${email}`);
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token, user: user.toObject() });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Error logging in user', error: error.toString() });
    }
});


// Route to get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a specific user by ID
router.get('/users/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
