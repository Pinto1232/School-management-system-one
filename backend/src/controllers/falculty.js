const Faculty = require('../models/Faculty');
const Finance = require('../models/Finance');
const Student = require('../models/Student');

// Helper function to handle validation and error messages
const validateFacultyData = (firstName, lastName, email, department, hireDate, position, phoneNumber, address) => {
    const errors = [];
    if (!firstName) errors.push('First name is required');
    if (!lastName) errors.push('Last name is required');
    if (!email) errors.push('Email is required');
    if (!department) errors.push('Department is required');
    if (!hireDate) errors.push('Hire date is required');
    if (!position) errors.push('Position is required');
    if (!phoneNumber) errors.push('Phone number is required');
    if (!address) errors.push('Address is required');

    return errors;
};

// Create a new faculty member
const createFaculty = async (req, res) => {
    try {
        const { firstName, lastName, email, department, hireDate, position, phoneNumber, address, students, financeRecords } = req.body;

        const errors = validateFacultyData(firstName, lastName, email, department, hireDate, position, phoneNumber, address);
        if (errors.length > 0) return res.status(400).json({ errors });

        const newFaculty = new Faculty({ firstName, lastName, email, department, hireDate, position, phoneNumber, address, students, financeRecords });
        await newFaculty.save();

        // Update students with the new faculty member
        if (students) {
            await Student.updateMany({ _id: { $in: students } }, { $addToSet: { facultyMembers: newFaculty._id } });
        }

        // Update finance records with the new faculty member
        if (financeRecords) {
            await Finance.updateMany({ _id: { $in: financeRecords } }, { faculty: newFaculty._id });
        }

        res.status(201).json({ message: 'Faculty member created', faculty: newFaculty });
    } catch (error) {
        res.status(400).json({ message: 'Error creating faculty member', error });
    }
};


// Get all faculty members
const getAllFaculties = async (req, res) => {
    try {
        const faculties = await Faculty.find().populate('students financeRecords');
        res.status(200).json({ faculties });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching faculty members', error });
    }
};

// Get a faculty member by ID
const getFacultyById = async (req, res) => {
    try {
        const { id } = req.params;
        const faculty = await Faculty.findById(id).populate('students financeRecords');
        
        if (!faculty) {
            return res.status(404).json({ message: 'Faculty member not found' });
        }
        
        res.status(200).json({ faculty });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching faculty member', error });
    }
};

// Update a faculty member
const updateFaculty = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, department, hireDate, position, phoneNumber, address } = req.body;

        const errors = validateFacultyData(firstName, lastName, email, department, hireDate, position, phoneNumber, address);
        if (errors.length > 0) return res.status(400).json({ errors });

        const updatedFaculty = await Faculty.findByIdAndUpdate(
            id,
            { firstName, lastName, email, department, hireDate, position, phoneNumber, address },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Faculty member updated', faculty: updatedFaculty });
    } catch (error) {
        res.status(400).json({ message: 'Error updating faculty member', error });
    }
};

// Delete a faculty member
const deleteFaculty = async (req, res) => {
    try {
        const { id } = req.params;
        await Faculty.findByIdAndDelete(id);

        res.status(200).json({ message: 'Faculty member deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting faculty member', error });
    }
};

// Export the controller methods
module.exports = {
    createFaculty,
    getAllFaculties,
    getFacultyById,
    updateFaculty,
    deleteFaculty,
};
