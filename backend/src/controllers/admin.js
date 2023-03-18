const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Helper function to validate admin data
const validateAdminData = (firstName, lastName, email, password) => {
  const errors = [];
  if (!firstName) errors.push('First name is required');
  if (!lastName) errors.push('Last name is required');
  if (!email) errors.push('Email is required');
  if (!password) errors.push('Password is required');

  return errors;
};

// Create a new admin
const createAdmin = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const errors = validateAdminData(firstName, lastName, email, password);
    if (errors.length > 0) return res.status(400).json({ errors });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin = new Admin({ firstName, lastName, email, password: hashedPassword });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin created', admin: newAdmin });
  } catch (error) {
    next(error);
  }
};

// Get all admins
const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find();
    res.status(200).json({ message: 'Admins fetched', admins });
  } catch (error) {
    next(error);
  }
};

// Get a single admin by ID
const getAdminById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);

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
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;

    const errors = validateAdminData(firstName, lastName, email, password);
    if (errors.length > 0) return res.status(400).json({ errors });

    const hashedPassword = await bcrypt.hash(password, 12);
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { firstName, lastName, email, password: hashedPassword },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: 'Admin updated', admin: updatedAdmin });
  } catch (error) {
    next(error);
  }
};

// Delete an admin
const deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Admin.findByIdAndDelete(id);

    res.status(200).json({ message: 'Admin deleted' });
  } catch (error) {
    next(error);
  }
};


// Authentication for the admin login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '48h' }
    );
    /* console.log('Admin token generated:', token); */
    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  login
};
