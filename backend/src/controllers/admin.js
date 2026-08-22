const User = require('../models/User');

const keycloakManaged = (res) => res.status(409).json({
  message: 'Create identities and assign the admin role in Keycloak. Local admin records are read-only profiles.',
  code: 'KEYCLOAK_MANAGED_ADMIN',
});

// Create a new admin
const createAdmin = async (req, res, next) => {
  return keycloakManaged(res);
};

// Get all admins
const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('-password -loginAttempts -lockUntil');
    res.status(200).json({ message: 'Admins fetched', admins });
  } catch (error) {
    next(error);
  }
};

// Get a single admin by ID
const getAdminById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await User.findOne({ _id: id, role: 'admin' })
      .select('-password -loginAttempts -lockUntil');

    if (!admin) {
      return res.status(404).json({ message: `Admin with ID ${id} not found.` });
    }

    res.status(200).json({ message: `Admin with ID ${id} fetched successfully.`, admin });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: `Invalid admin ID: ${id}` });
    }
    next(error);
  }
};


// Update an admin
const updateAdmin = async (req, res, next) => {
  return keycloakManaged(res);
};

// Delete an admin
const deleteAdmin = async (req, res, next) => {
  return keycloakManaged(res);
};


module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
