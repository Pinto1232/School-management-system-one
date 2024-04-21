const express = require('express');
const router = express.Router();
const {  deleteUser, getUsers } = require('../controllers/users');
const asyncHandler = require('../middlewares/asyncHandler');
const upload = require('../middlewares/multerConfig');
const User = require('../models/User');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with a profile image.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User registered successfully.
 */

router.post('/register', upload.single('profileImage'), async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    // Check for the presence of all required fields including the file
    if (!req.file || !firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'All fields including a profile image are required' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user instance
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            image: req.file.path  
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with success message and user info (excluding password)
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                image: newUser.image
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
}, (error, req, res, next) => {
    // Handle Multer errors
    if (error instanceof multer.MulterError) {
        return res.status(400).json({ error: error.message });
    }
    // Forward other errors to the next error handler
    next(error);
});

// get the user query asynchronously
router.get('/', asyncHandler(getUsers));



/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     description: Logs in a user and returns a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful.
 */
router.post('/login', async (req, res) => {
     try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`No user found for email: ${email}`);
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                image: user.image,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Error logging in user', error: error.toString() });
    }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get('/users', async (req, res) => {
     try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     description: Returns a single user by ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object.
 */
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

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully.
 */
router.delete('/user/:id', asyncHandler(deleteUser));

module.exports = router;