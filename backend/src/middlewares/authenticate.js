const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');
const User = require('../models/User');
const Admin = require('../models/Admin');
const asyncHandler = require('./asyncHandler');

module.exports = asyncHandler(async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Missing or incorrect Authorization header');
        return res.status(401).json({ message: 'Invalid token, access denied.' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await Admin.findById(decoded.userId);
        if (!user) {
            console.log('User not found with decoded userId');
            return res.status(401).json({ message: 'Invalid token, access denied.' });
        }
        req.user = user;
        next();
    } catch (err) {
        console.log('Error during token verification:', err.message);
        return res.status(401).json({ message: 'Invalid token, access denied.' });
    }
});
