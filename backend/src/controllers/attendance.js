const Attendance = require('../models/Attendance');

// Controller function to create new attendance record
const createAttendance = async (req, res) => {
    // Retrieve attendance data from request body
    const { studentID, date, status } = req.body;

    try {
        // Create new Attendance instance using retrieved data
        const attendance = new Attendance({
            studentID,
            date,
            status
        });

        // Save new attendance record to database
        const result = await attendance.save();

        // Send success response with saved attendance record
        res.status(201).json(result);
    } catch (err) {
        // If error occurs, send error response with error message
        res.status(500).json({ message: err.message });
    }
};

// Controller function to retrieve all attendance records
const getAttendance = async (req, res) => {
    try {
        // Find all attendance records in database
        const attendance = await Attendance.find();

        // Send success response with all attendance records
        res.json(attendance);
    } catch (err) {
        // If error occurs, send error response with error message
        res.status(500).json({ message: err.message });
    }
};

// Controller function to retrieve single attendance record by ID
const getAttendanceByID = async (req, res) => {
    // Retrieve attendance ID from request parameters
    const { id } = req.params;

    try {
        // Find attendance record in database by ID
        const attendance = await Attendance.findById(id);

        // If attendance record with given ID does not exist, send 404 response
        if (!attendance) {
            res.status(404).json({ message: 'Attendance record not found' });
            return;
        }

        // Send success response with attendance record
        res.json(attendance);
    } catch (err) {
        // If error occurs, send error response with error message
        res.status(500).json({ message: err.message });
    }
};

// Controller function to update single attendance record by ID
const updateAttendance = async (req, res) => {
    // Retrieve attendance ID and updated data from request parameters and body
    const { id } = req.params;
    const { studentID, date, status } = req.body;

    try {
        // Find attendance record in database by ID and update with new data
        const attendance = await Attendance.findByIdAndUpdate(
            id,
            {
                studentID,
                date,
                status
            },
            { new: true }
        );

        // If attendance record with given ID does not exist, send 404 response
        if (!attendance) {
            res.status(404).json({ message: 'Attendance record not found' });
            return;
        }

        // Send success response with updated attendance record
        res.json(attendance);
    } catch (err) {
        // If error occurs, send error response with error message
        res.status(500).json({ message: err.message });
    }
};


// Delete a specific attendance record by ID
const deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const attendance = await Attendance.findById(id);

        if (!attendance) {
            return res.status(404).json({ msg: 'Attendance record not found' });
        }

        await attendance.remove();

        // Send success response with deleted attendance record
        res.json({ msg: 'Attendance record deleted', attendance });
    } catch (err) {
        console.error(err.message);

        // Handle server error
        res.status(500).send('Server Error');
    }
};

module.exports = { createAttendance, getAttendance, getAttendances, updateAttendance, deleteAttendance };

