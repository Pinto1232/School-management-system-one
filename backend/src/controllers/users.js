const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/env');
const asyncHandler = require('../middlewares/asyncHandler');
const multer = require('multer');

// Ensure the uploads directory exists
const fs = require('fs');
const uploadDir = './uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

exports.register = asyncHandler(upload.single('profileImage'), async (req, res) => {
    console.log("Attempt to register user:", req.body);
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Profile image upload failed' });
        }

        const { email, password, firstName, lastName, role } = req.body;
        const profileImage = req.file.path;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Create and save the new user
        const user = new User({ email, password, firstName, lastName, role, image: profileImage });
        console.log('Saving user...');
        await user.save();
        console.log('User saved successfully');

        // Respond with the new user's data
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                image: user.image
            }
        });
    } catch (error) {
        console.error('Error during registration:', error); // Log the full error
        res.status(500).json({ error: 'An error occurred during the registration process' });
    }
});


exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const payload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });

    res.status(200).json({
        token,
        message: 'User logged in successfully',
        user: {
            id: user._id,
            name: user.firstName + ' ' + user.lastName,
            image: user.image
        }
    });
});
