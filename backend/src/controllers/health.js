const Health = require('../models/Health');

// @desc   Get all health records
// @route  GET /api/health
// @access Public
const getAllHealthRecords = async (req, res) => {
    try {
        // Fetch all health records from the database
        const healthRecords = await Health.find();

        // Send success response with the health records data
        res.status(200).json({
            success: true,
            count: healthRecords.length,
            data: healthRecords
        });
    } catch (error) {
        // Send error response if there is a problem with fetching the health records data
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};


// @desc    Get single health record by ID
// @route   GET /api/health/:id
// @access  Public
const getHealthRecordById = async (req, res) => {
    try {
        // Fetch a single health record by its ID from the database
        const healthRecord = await Health.findById(req.params.id);

        // Send success response with the health record data
        res.status(200).json({
            success: true,
            data: healthRecord
        });
    } catch (error) {
        // Send error response if there is a problem with fetching the health record data
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Health record not found with ID: ${req.params.id}`
            });
        } else {
            // Handle general errors
            res.status(500).json({
                success: false,
                error: `Server error: ${error.message}`
            });
        }
    }
};


// @desc    Create new health record
// @route   POST /api/health
// @access  Private
const createHealthRecord = async (req, res) => {
    try {
        // Create a new health record based on the request body data
        const healthRecord = await Health.create(req.body);

        // Send success response with the created health record data
        res.status(201).json({
            success: true,
            data: healthRecord
        });
    } catch (error) {
        // Send error response if there is a problem with creating the health record
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};


// @desc    Update health record by ID
// @route   PUT /api/health/:id
// @access  Private
const updateHealthRecord = async (req, res) => {
    try {
        // Find and update a health record by its ID in the database
        const healthRecord = await Health.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Send success response with the updated health record data
        res.status(200).json({
            success: true,
            data: healthRecord
        });
    } catch (error) {
        // Send error response if there is a problem with updating the health record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Health record not found with ID: ${req.params.id}`
            });
        } else {
            // Handle general errors
            res.status(500).json({
                success: false,
                error: `Server error: ${error.message}`
            });
        }
    }
};



// @desc    Delete health record by ID
// @route   DELETE /api/health/:id
// @access  Private
const deleteHealthRecord = async (req, res) => {
    try {
        // Find and delete a health record by its ID in the database
        const healthRecord = await Health.findByIdAndDelete(req.params.id);

        // Send success response with the deleted health record data
        res.status(200).json({
            success: true,
            data: healthRecord
        });
    } catch (error) {
        // Send error response if there is a problem with deleting the health record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Health record not found with ID: ${req.params.id}`
            });
        } else {
            // Handle general errors
            res.status(500).json({
                success: false,
                error: `Server error: ${error.message}`
            });
        }
    }
};


module.exports = {
    getAllHealthRecords,
    getHealthRecordById,
    createHealthRecord,
    updateHealthRecord,
    deleteHealthRecord
};
