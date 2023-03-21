const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');
const User = require('../models/User');
const Admin = require('../models/Admin');
const asyncHandler = require('./asyncHandler');

module.exports = asyncHandler(async (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log('Auth Header:', authHeader); // Debugging line

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Missing or incorrect Authorization header');
        return res.status(401).json({ message: 'Invalid token, access denied.' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token:', token); // Debugging line

    try {
        const decoded = jwt.verify(token, jwtSecret);
        console.log('Decoded Token:', decoded); // Debugging line

        /* This code will check both User and Admin model */
        const user = await User.findById(decoded.userId) || await Admin.findById(decoded.userId);
        console.log('User:', user); // Debugging line

        if (!user) {
            console.log('User not found with decoded userId');
            return res.status(401).json({ message: 'Invalid token, access denied.' });
        }
        req.user = user;
        next();
    } catch (err) {
        console.log('Error during token verification:', err.message); // Debugging line
        return res.status(401).json({ message: 'Invalid token, access denied.' });
    }
});
