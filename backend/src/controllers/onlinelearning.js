const OnlineLearning = require('../models/OnlineLearning');

// @desc    Get all online learning records
// @route   GET /api/online-learning
// @access  Public
const getOnlineLearningRecords = async (req, res) => {
    try {
        // Fetch all online learning records from the database
        const onlineLearningRecords = await OnlineLearning.find();

        // Send success response with the online learning records data
        res.status(200).json({
            success: true,
            count: onlineLearningRecords.length,
            data: onlineLearningRecords
        });
    } catch (error) {
        // Send error response if there is a problem with fetching the online learning records data
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};

// @desc    Get single online learning record by ID
// @route   GET /api/online-learning/:id
// @access  Public
const getOnlineLearningRecordById = async (req, res) => {
    try {
        // Fetch a single online learning record by its ID from the database
        const onlineLearningRecord = await OnlineLearning.findById(req.params.id);

        // Send success response with the online learning record data
        res.status(200).json({
            success: true,
            data: onlineLearningRecord
        });
    } catch (error) {
        // Send error response if there is a problem with fetching the online learning record data
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Online learning record not found with ID: ${req.params.id}`
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

// @desc    Create new online learning record
// @route   POST /api/online-learning
// @access  Private
const createOnlineLearningRecord = async (req, res) => {
    try {
        // Create a new online learning record based on the request body data
        const onlineLearningRecord = await OnlineLearning.create(req.body);

        // Send success response with the created online learning record data
        res.status(201).json({
            success: true,
            data: onlineLearningRecord
        });
    } catch (error) {
        // Send error response if there is a problem with creating the online learning record
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};


// @desc    Update online learning record by ID
// @route   PUT /api/onlinelearning/:id
// @access  Private
const updateOnlineLearningRecord = async (req, res) => {
    try {
        // Find and update an online learning record by its ID in the database
        const onlineLearningRecord = await OnlineLearning.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Send success response with the updated online learning record data
        res.status(200).json({
            success: true,
            data: onlineLearningRecord
        });
    } catch (error) {
        // Send error response if there is a problem with updating the online learning record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Online learning record not found with ID: ${req.params.id}`
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



// @desc    Delete onlinelearning record by ID
// @route   DELETE /api/onlinelearning/:id
// @access  Private
const deleteOnlineLearningRecord = async (req, res) => {
    try {
        // Find and remove an onlinelearning record by its ID from the database
        const onlinelearningRecord = await OnlineLearning.findByIdAndRemove(req.params.id);

        // Send success response with the deleted onlinelearning record data
        res.status(200).json({
            success: true,
            data: onlinelearningRecord
        });
    } catch (error) {
        // Send error response if there is a problem with deleting the onlinelearning record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Online learning record not found with ID: ${req.params.id}`
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
    getOnlineLearningRecords,
    getOnlineLearningRecordById,
    createOnlineLearningRecord,
    updateOnlineLearningRecord,
    deleteOnlineLearningRecord
};