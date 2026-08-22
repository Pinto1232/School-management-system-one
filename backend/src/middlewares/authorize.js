const authorize = (roles) => {
  const allowedRoles = roles.map(role => role.toLowerCase());

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    const userRoles = Array.isArray(req.user.roles) ? [...req.user.roles] : [req.user.role];
    if (userRoles.includes('platform_admin') && !userRoles.includes('admin')) userRoles.push('admin');
    if (!userRoles.some(role => allowedRoles.includes(String(role).toLowerCase()))) {
      return res.status(403).json({
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}.`,
      });
    }

    next();
  };
};

module.exports = {
  authorize,
};
