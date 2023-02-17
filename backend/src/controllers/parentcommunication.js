const ParentCommunication = require('../models/ParentCommunication');

// @desc    Get all parentcommunication records
// @route   GET /api/parentcommunication
// @access  Public
const getParentCommunications = async (req, res) => {
    try {
        // Fetch all parentcommunication records from the database
        const parentcommunications = await ParentCommunication.find();

        // Send success response with the parentcommunication records data
        res.status(200).json({
            success: true,
            count: parentcommunications.length,
            data: parentcommunications
        });
    } catch (error) {
        // Send error response if there is a problem with fetching the parentcommunication records data
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};


// @desc    Get single parent communication record by ID
// @route   GET /api/parentcommunications/:id
// @access  Public
const getParentCommunicationById = async (req, res) => {
    try {
        // Find the parent communication record by its ID in the database
        const parentCommunication = await ParentCommunication.findById(req.params.id);

        // Send success response with the parent communication record data
        res.status(200).json({
            success: true,
            data: parentCommunication
        });
    } catch (error) {
        // Send error response if there is a problem with fetching the parent communication record data
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Parent communication record not found with ID: ${req.params.id}`
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


// @desc    Update parent communication record by ID
// @route   PUT /api/parentcommunication/:id
// @access  Private
const updateParentCommunicationRecord = async (req, res) => {
    try {
        // Find and update a parent communication record by its ID in the database
        const parentCommunicationRecord = await ParentCommunication.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        // Send success response with the updated parent communication record data
        res.status(200).json({
            success: true,
            data: parentCommunicationRecord
        });
    } catch (error) {
        // Send error response if there is a problem with updating the parent communication record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Parent communication record not found with ID: ${req.params.id}`
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



// @desc    Delete parentcommunication record by ID
// @route   DELETE /api/parentcommunications/:id
// @access  Private
const deleteParentCommunicationRecord = async (req, res) => {
    try {
        // Find and delete a parentcommunication record by its ID in the database
        const deletedRecord = await ParentCommunication.findByIdAndDelete(req.params.id);

        // Send success response with the deleted record data
        res.status(200).json({
            success: true,
            data: deletedRecord
        });
    } catch (error) {
        // Send error response if there is a problem with deleting the parentcommunication record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `ParentCommunication record not found with ID: ${req.params.id}`
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
    getParentCommunications,
    getParentCommunicationById,
    updateParentCommunicationRecord,
    deleteParentCommunicationRecord
};
