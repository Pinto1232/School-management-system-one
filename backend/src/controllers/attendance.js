const Attendance = require('../models/Attendance');
const User = require('../models/User');
const Course = require('../models/Course');

// Helper function to handle validation and error messages
const validateAttendanceData = (student, date, status, course) => {
    const errors = [];
    if (!student) errors.push('Student is required');
    if (!date) errors.push('Date is required');
    if (!status) errors.push('Status is required');
    if (!course) errors.push('Course is required');

    return errors;
};

// Create a new attendance record
const createAttendance = async (req, res) => {
    try {
        const { studentId: student, date, status, courseId: course } = req.body;


        const errors = validateAttendanceData(student, date, status, course);
        if (errors.length > 0) return res.status(400).json({ errors });

        const newAttendance = new Attendance({ student, date, status, course });
        await newAttendance.save();

        res.status(201).json({ message: 'Attendance record created', attendance: newAttendance });
    } catch (error) {
        res.status(400).json({ message: 'Error creating attendance record', error });
    }
};

// Get all attendance records
const getAllAttendance = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find().populate('student course');
        res.status(200).json({ attendance: attendanceRecords });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching attendance records', error });
    }
};

// Get an attendance record by ID
const getAttendanceById = async (req, res) => {
    try {
        const { id } = req.params;
        const attendanceRecord = await Attendance.findById(id).populate('student course');
        
        if (!attendanceRecord) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        
        res.status(200).json({ attendance: attendanceRecord });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching attendance record', error });
    }
};


// Update an attendance record
const updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { student, date, status, course } = req.body;

        const errors = validateAttendanceData(student, date, status, course);
        if (errors.length > 0) return res.status(400).json({ errors });

        const updatedAttendance = await Attendance.findByIdAndUpdate(
            id,
            { student, date, status, course },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Attendance record updated', attendance: updatedAttendance });
    } catch (error) {
        res.status(400).json({ message: 'Error updating attendance record', error });
    }
};

// Delete an attendance record
const deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        await Attendance.findByIdAndDelete(id);

        res.status(200).json({ message: 'Attendance record deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting attendance record', error });
    }
};

// Export the controller methods
module.exports = {
    createAttendance,
    getAllAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance,
};