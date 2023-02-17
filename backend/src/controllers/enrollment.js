const Enrollment = require('../models/Enrollment');

// @desc   Get all enrollments
// @route  GET /api/enrollments
// @access Private
const getEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find();
        res.status(200).json({ success: true, data: enrollments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc   Get single enrollment
// @route  GET /api/enrollments/:id
// @access Private
const getEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id);
        if (!enrollment) {
            return res.status(404).json({ success: false, error: 'Enrollment not found' });
        }
        res.status(200).json({ success: true, data: enrollment });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ success: false, error: 'Enrollment not found' });
        }
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc   Add enrollment
// @route  POST /api/enrollments
// @access Private
const addEnrollment = async (req, res) => {
    try {
        const enrollment = new Enrollment(req.body);
        const newEnrollment = await enrollment.save();
        res.status(201).json({ success: true, data: newEnrollment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc   Update enrollment
// @route  PUT /api/enrollments/:id
// @access Private
const updateEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!enrollment) {
            return res.status(404).json({ success: false, error: 'Enrollment not found' });
        }
        res.status(200).json({ success: true, data: enrollment });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ success: false, error: 'Enrollment not found' });
        }
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc   Delete enrollment
// @route  DELETE /api/enrollments/:id
// @access Private
const deleteEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
        if (!enrollment) {
            return res.status(404).json({ success: false, error: 'Enrollment not found' });
        }
        res.status(200).json({ success: true, message: 'Enrollment deleted successfully' });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ success: false, error: 'Enrollment not found' });
        }
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { getEnrollments, getEnrollment, addEnrollment, updateEnrollment, deleteEnrollment };
