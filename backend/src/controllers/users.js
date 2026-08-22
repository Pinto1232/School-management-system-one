const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');

exports.getUsers = asyncHandler(async (req, res) => {
  const query = {};
  if (req.query.firstName) query.firstName = { $regex: new RegExp(req.query.firstName, 'i') };
  if (req.query.lastName) query.lastName = { $regex: new RegExp(req.query.lastName, 'i') };
  if (req.query.email) query.email = req.query.email;

  const pageSize = Math.min(Math.max(Number.parseInt(req.query.pageSize, 10) || 10, 1), 100);
  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
  const [users, totalUsers] = await Promise.all([
    User.find(query)
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .select('-password -loginAttempts -lockUntil')
      .sort({ firstName: 1, lastName: 1 }),
    User.countDocuments(query),
  ]);

  res.status(200).json({
    message: 'Users fetched successfully',
    data: users,
    pageInfo: {
      currentPage: page,
      totalPages: Math.ceil(totalUsers / pageSize),
      totalUsers,
    },
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  return res.status(409).json({
    message: 'Delete the identity in Keycloak before removing its local profile.',
    code: 'KEYCLOAK_MANAGED_USER',
  });
});
