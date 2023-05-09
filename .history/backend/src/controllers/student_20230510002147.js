const Student = require('../models/Student');
const multer = require('multer');
const upload = multer();

// Helper function to validate student data
const validateStudentData = (firstName, lastName, email, dateOfBirth, phoneNumber, address) => {
  const errors = [];
  if (!firstName) errors.push('First name is required');
  if (!lastName) errors.push('Last name is required');
  if (!email) errors.push('Email is required');
  if (!dateOfBirth) errors.push('Date of birth is required');
  if (!phoneNumber) errors.push('Phone number is required');
  if (!address) errors.push('Address is required');

  return errors;
};

// Create a new student
/* const createStudent = async (req, res, next) => {
  try {
    const { firstName, lastName, email, dateOfBirth, phoneNumber, address } = req.body;

    const errors = validateStudentData(firstName, lastName, email, dateOfBirth, phoneNumber, address);
    if (errors.length > 0) return res.status(400).json({ errors });

    const newStudent = new Student({ firstName, lastName, email, dateOfBirth, phoneNumber, address });
    await newStudent.save();

    res.status(201).json({ message: 'Student created', student: newStudent });
  } catch (error) {
    next(error);
  }
}; */

// Get all students
const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json({ message: 'Students fetched', students });
  } catch (error) {
    next(error);
  }
};

// Update a student
const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, dateOfBirth, phoneNumber, address } = req.body;

    const errors = validateStudentData(firstName, lastName, email, dateOfBirth, phoneNumber, address);
    if (errors.length > 0) return res.status(400).json({ errors });

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { firstName, lastName, email, dateOfBirth, phoneNumber, address },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: 'Student updated', student: updatedStudent });
  } catch (error) {
    next(error);
  }
};

// Get a single student by ID
const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student fetched', student });
  } catch (error) {
    next(error);
  }
};


// Delete a student
const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);

    res.status(200).json({ message: 'Student deleted' });
  } catch (error) {
    next(error);
  }
};

// Export the controller methods
module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
