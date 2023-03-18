const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/env');
const asyncHandler = require('../middlewares/asyncHandler');

exports.register = asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
    }

    const user = new User({ email, password, firstName, lastName, role });
    await user.save();
    console.log('Registered user:', user);

    res.status(201).json({ message: 'User registered successfully' });
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

    // Set the token to expire in 1 hour (or any desired duration)
    const expiresIn = '4h';

    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
    console.log('Logged-in user:', user); // Move this line here
    console.log('Generated token:', token); // Move this line here
    res.status(200).json({ token, message: 'User logged in successfully' });
});
