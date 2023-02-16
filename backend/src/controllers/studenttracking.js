const StudentTracking = require("../models/StudentTracking")


// @desc    Get all studenttracking records
// @route   GET /api/studenttracking
// @access  Private
const getAllStudentTrackingRecords = async (req, res) => {
    try {
        // Find all studenttracking records in the database
        const studenttrackingRecords = await StudentTracking.find();

        // Send success response with the studenttracking records data
        res.status(200).json({
            success: true,
            data: studenttrackingRecords
        });
    } catch (error) {
        // Send error response if there is a problem with getting the studenttracking records
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};



// @desc    Get a single studenttracking record by ID
// @route   GET /api/studenttracking/:id
// @access  Private
const getStudentTrackingById = async (req, res) => {
    try {
        const studenttracking = await StudentTracking.findById(req.params.id);

        if (!studenttracking) {
            // Return a 404 error if the studenttracking record with the specified ID is not found
            return res.status(404).json({ success: false, error: 'StudentTracking record not found' });
        }

        // Return the studenttracking record if it is found
        res.status(200).json({ success: true, data: studenttracking });
    } catch (error) {
        // Return a 500 error if there is a server error
        res.status(500).json({ success: false, error: 'Server error' });
    }
};


// @desc    Create new studenttracking record
// @route   POST /api/studenttracking
// @access  Private
const createStudentTrackingRecord = async (req, res) => {
    try {
        // Create a new studenttracking record in the database
        const studenttrackingRecord = await StudentTracking.create(req.body);

        // Send success response with the newly created studenttracking record data
        res.status(201).json({
            success: true,
            data: studenttrackingRecord
        });
    } catch (error) {
        // Send error response if there is a problem with creating the studenttracking record
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}

// @desc    Update studenttracking record by ID
// @route   PUT /api/studenttracking/:id
// @access  Private
const updateStudentTrackingRecord = async (req, res) => {
    try {
        // Find and update a studenttracking record by its ID in the database
        const studentTrackingRecord = await StudentTracking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Send success response with the updated studenttracking record data
        res.status(200).json({
            success: true,
            data: studentTrackingRecord
        });
    } catch (error) {
        // Send error response if there is a problem with updating the studenttracking record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Student tracking record not found with ID: ${req.params.id}`
            });
        } else {
            res.status(500).json({
                success: false,
                error: `Server error: ${error.message}`
            });
        }
    }
};



// @desc    Delete a studenttracking record by ID
// @route   DELETE /api/studenttracking/:id
// @access  Private
const deleteStudentTrackingRecord = async (req, res) => {
    try {
      // Find and delete a studenttracking record by its ID in the database
      const deletedRecord = await StudentTracking.findByIdAndDelete(req.params.id);
  
      // Send success response with the deleted studenttracking record data
      res.status(200).json({
        success: true,
        data: deletedRecord
      });
    } catch (error) {
      // Send error response if there is a problem with deleting the studenttracking record
      res.status(500).json({
        success: false,
        error: `Server error: ${error.message}`
      });
    }
  };
  

module.exports = {
    getAllStudentTrackingRecords,
    getStudentTrackingById,
    createStudentTrackingRecord,
    updateStudentTrackingRecord,
    deleteStudentTrackingRecord
};
