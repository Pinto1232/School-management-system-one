const Transportation = require("../models/Transportation")


// @desc    Get all transportation records
// @route   GET /api/transportation
// @access  Public
const getTransportationRecords = async (req, res) => {
    try {
        const transportationRecords = await Transportation.find();
        res.status(200).json({
            success: true,
            count: transportationRecords.length,
            data: transportationRecords,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`,
        });
    }
};



// @desc    Get single transportation record by ID
// @route   GET /api/transportation/:id
// @access  Private
const getTransportationById = async (req, res) => {
    try {
        // Find the transportation record in the database by its ID
        const transportationRecord = await Transportation.findById(req.params.id);

        // Check if the transportation record exists in the database
        if (!transportationRecord) {
            return res.status(404).json({
                success: false,
                error: `Transportation record not found with ID: ${req.params.id}`
            });
        }

        // Send success response with the transportation record data
        res.status(200).json({
            success: true,
            data: transportationRecord
        });
    } catch (error) {
        // Send error response if there is a problem with getting the transportation record
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};


// @desc    Create new transportation record
// @route   POST /api/transportation
// @access  Private
const createTransportationRecord = async (req, res) => {
    try {
        // Create a new transportation record from the request body
        const transportationRecord = await Transportation.create(req.body);

        // Send success response with the new transportation record data
        res.status(201).json({
            success: true,
            data: transportationRecord
        });
    } catch (error) {
        // Send error response if there is a problem with creating the transportation record
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};

// @desc    Update transportation record by ID
// @route   PUT /api/transportation/:id
// @access  Private
const updateTransportationRecord = async (req, res) => {
    try {
        // Find and update a transportation record by its ID in the database
        const transportationRecord = await Transportation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        // Send success response with the updated transportation record data
        res.status(200).json({
            success: true,
            data: transportationRecord,
        });
    } catch (error) {
        // Send error response if there is a problem with updating the transportation record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Transportation record not found with ID: ${req.params.id}`,
            });
        } else {
            res.status(500).json({
                success: false,
                error: `Server error: ${error.message}`,
            });
        }
    }
};



// @desc    Delete transportation record by ID
// @route   DELETE /api/transportation/:id
// @access  Private
const deleteTransportationRecord = async (req, res) => {
    try {
        // Find and delete a transportation record by its ID in the database
        const deletedRecord = await Transportation.findByIdAndDelete(req.params.id);

        // Send success response with the deleted transportation record data
        res.status(200).json({
            success: true,
            data: deletedRecord
        });
    } catch (error) {
        // Send error response if there is a problem with deleting the transportation record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Transportation record not found with ID: ${req.params.id}`
            });
        } else {
            // Send a generic error response
            res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};


module.exports = {
    getTransportationRecords,
    getTransportationById,
    createTransportationRecord,
    updateTransportationRecord,
    deleteTransportationRecord
}