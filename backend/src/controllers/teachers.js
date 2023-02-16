const Student = require('../models/Student');


// @desc    Get all teacher records
// @route   GET /api/teachers
// @access  Public
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();

        res.status(200).json({
            success: true,
            count: teachers.length,
            data: teachers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};




// This code may be revised in the future
const getTeachersByStudentId = async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId).populate('teachers');
        if (!student) {
            return res.status(404).json({ success: false, error: 'Student not found' });
        }
        const teachers = student.teachers;
        return res.status(200).json({ success: true, data: teachers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
};


// @desc    Get single teacher record by ID
// @route   GET /api/teacher/:id
// @access  Private
const getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);

        // Send success response with the teacher data
        res.status(200).json({
            success: true,
            data: teacher
        });
    } catch (error) {
        // Send error response if there is a problem with finding the teacher record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Teacher not found with ID: ${req.params.id}`
            });
        } else {
            res.status(500).json({
                success: false,
                error: `Server error: ${error.message}`
            });
        }
    }
};


// @desc    Create new teacher record
// @route   POST /api/teachers
// @access  Private
const createTeacherRecord = async (req, res) => {
    try {
        // Create a new teacher record with the request body data
        const teacher = await Teacher.create(req.body);

        // Send success response with the new teacher record data
        res.status(201).json({
            success: true,
            data: teacher
        });
    } catch (error) {
        // Send error response if there is a problem with creating the teacher record
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};



// @desc    Update teacher record by ID
// @route   PUT /api/teachers/:id
// @access  Private
const updateTeacherRecord = async (req, res) => {
    try {
        // Find and update a teacher record by its ID in the database
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Send success response with the updated teacher record data
        res.status(200).json({
            success: true,
            data: teacher
        });
    } catch (error) {
        // Send error response if there is a problem with updating the teacher record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Teacher not found with ID: ${req.params.id}`
            });
        } else {
            // Handle any other errors
            res.status(500).json({
                success: false,
                error: `Server error: ${error.message}`
            });
        }
    }
};


// @desc    Delete teacher record by ID
// @route   DELETE /api/teachers/:id
// @access  Private
const deleteTeacher = async (req, res) => {
    try {
        // Find and remove a teacher record by its ID from the database
        const teacher = await Teacher.findByIdAndRemove(req.params.id);

        // Send success response with the deleted teacher record data
        res.status(200).json({
            success: true,
            data: teacher
        });
    } catch (error) {
        // Send error response if there is a problem with deleting the teacher record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Teacher not found with ID: ${req.params.id}`
            });
        } else {
            res.status(500).json({
                success: false,
                error: `Server error: ${error.message}`
            });
        }
    }
}

module.exports = {
    getTeachersByStudentId,
    getAllTeachers,
    getTeacherById,
    createTeacherRecord,
    updateTeacherRecord,
    deleteTeacher
};