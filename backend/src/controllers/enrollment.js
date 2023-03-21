const Enrollment = require('../models/Enrollment');

// Helper function to validate enrollment data
const validateEnrollmentData = (student, course, enrollmentDate, status) => {
    const errors = [];
    if (!student) errors.push('Student is required');
    if (!course) errors.push('Course is required');
    if (!enrollmentDate) errors.push('Enrollment date is required');
    if (!status) errors.push('Status is required');

    return errors;
};


// Create a new enrollment
const createEnrollment = async (req, res) => {
    try {
        const { student, course, enrollmentDate, status } = req.body;

        const newEnrollment = new Enrollment({ student, course, enrollmentDate, status });
        await newEnrollment.save();

        res.status(201).json({ message: 'Enrollment created', enrollment: newEnrollment });
    } catch (error) {
        res.status(400).json({ message: 'Error creating enrollment', error });
    }
};

// Get all enrollments
const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find().populate('student course');
        res.status(200).json({ enrollments });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching enrollments', error });
    }
};

// Get an enrollment by ID
const getEnrollmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const enrollment = await Enrollment.findById(id).populate('student course');

        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        res.status(200).json({ enrollment });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching enrollment', error });
    }
};

// Update an enrollment
const updateEnrollment = async (req, res) => {
    try {
        const { id } = req.params;
        const { student, course, enrollmentDate, status } = req.body;

        const updatedEnrollment = await Enrollment.findByIdAndUpdate(
            id,
            { student, course, enrollmentDate, status },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Enrollment updated', enrollment: updatedEnrollment });
    } catch (error) {
        res.status(400).json({ message: 'Error updating enrollment', error });
    }
};

// Get enrollments by student ID
const getEnrollmentsByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;
        const enrollments = await Enrollment.find({ student: studentId }).populate('course');

        if (!enrollments) {
            return res.status(404).json({ message: 'Enrollments not found' });
        }

        res.status(200).json({ enrollments });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching enrollments', error });
    }
};

// Delete an enrollment
const deleteEnrollment = async (req, res) => {
    try {
        const { id } = req.params;
        await Enrollment.findByIdAndDelete(id);

        res.status(200).json({ message: 'Enrollment deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting enrollment', error });
    }
};

// Export the controller methods
module.exports = {
    createEnrollment,
    getAllEnrollments,
    getEnrollmentById,
    updateEnrollment,
    deleteEnrollment,
    getEnrollmentsByStudentId,
};
