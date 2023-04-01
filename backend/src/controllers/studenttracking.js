const mongoose = require('mongoose');
const StudentTracking = require('../models/StudentTracking');

// Create a new student tracking record
exports.createStudentTracking = async (req, res) => {
    try {
        const newStudentTracking = new StudentTracking(req.body);
        await newStudentTracking.save();
        res.status(201).json({ success: true, data: newStudentTracking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all student tracking records
exports.getAllStudentTrackings = async (req, res) => {
    try {
        const studentTrackings = await StudentTracking.find().populate('student');
        res.status(200).json({ success: true, data: studentTrackings });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get one student tracking record by ID
exports.getStudentTrackingById = async (req, res) => {
    try {
        const studentTracking = await StudentTracking.findById(req.params.id).populate('student');
        if (!studentTracking) {
            return res.status(404).json({ success: false, message: 'Student tracking not found' });
        }
        res.status(200).json({ success: true, data: studentTracking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update a student tracking record by ID
exports.updateStudentTracking = async (req, res) => {
    try {
        const studentTracking = await StudentTracking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!studentTracking) {
            return res.status(404).json({ success: false, message: 'Student tracking not found' });
        }
        res.status(200).json({ success: true, data: studentTracking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a student tracking record by ID
exports.deleteStudentTracking = async (req, res) => {
    try {
        const studentTracking = await StudentTracking.findByIdAndRemove(req.params.id);
        if (!studentTracking) {
            return res.status(404).json({ success: false, message: 'Student tracking not found' });
        }
        res.status(200).json({ success: true, data: studentTracking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all student tracking records for a specific student
exports.getStudentTrackingsByStudentId = async (req, res) => {
    try {
        const studentTrackings = await StudentTracking.find({ student: req.params.studentId }).populate('student');
        res.status(200).json({ success: true, data: studentTrackings });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update a student tracking record by student ID and tracking ID
exports.updateStudentTrackingByStudentId = async (req, res) => {
    try {
        const studentTracking = await StudentTracking.findOneAndUpdate({ _id: req.params.id, student: req.params.studentId }, req.body, { new: true, runValidators: true });
        if (!studentTracking) {
            return res.status(404).json({ success: false, message: 'Student tracking not found' });
        }
        res.status(200).json({ success: true, data: studentTracking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// Delete a student tracking record by student ID and tracking ID
exports.deleteStudentTrackingByStudentId = async (req, res) => {
    try {
        const studentTracking = await StudentTracking.findOneAndRemove({ _id: req.params.id, student: req.params.studentId });
        if (!studentTracking) {
            return res.status(404).json({ success: false, message: 'Student tracking not found' });
        }
        res.status(200).json({ success: true, data: studentTracking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};