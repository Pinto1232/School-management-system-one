const User = require('../models/User');

const authorize = (roles) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: 'Invalid user, access denied.' });
      }

      console.log('User:', user);
      console.log('Expected roles:', roles);

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: `Access denied. Only ${roles.join(', ')} roles allowed.` });
      }

      next();
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
};


module.exports = authorize;
