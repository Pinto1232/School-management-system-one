const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/env');

const authenticate = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing, access denied.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token || authHeader.split(' ')[0].toLowerCase() !== 'bearer') {
    return res.status(401).json({ message: 'Invalid token format, access denied.' });
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token, access denied.' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token, access denied.' });
  }
};

module.exports = authenticate;
