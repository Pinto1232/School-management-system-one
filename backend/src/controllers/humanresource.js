const HumanResource = require('../models/HumanResource');

// @desc    Get all human resource records
// @route   GET /api/humanresources
// @access  Public
const getHumanResources = async (req, res) => {
    try {
        // Fetch all human resource records from the database
        const humanResources = await HumanResource.find();

        // Send success response with the human resource records data
        res.status(200).json({
            success: true,
            count: humanResources.length,
            data: humanResources
        });
    } catch (error) {
        // Send error response if there is a problem with fetching the human resource records data
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};


// @desc    Get single human resource record by ID
// @route   GET /api/humanresources/:id
// @access  Public
const getHumanResourceById = async (req, res) => {
    try {
        // Fetch a single human resource record by its ID from the database
        const humanResource = await HumanResource.findById(req.params.id);

        // Send success response with the human resource record data
        res.status(200).json({
            success: true,
            data: humanResource
        });
    } catch (error) {
        // Send error response if there is a problem with fetching the human resource record data
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Human resource record not found with ID: ${req.params.id}`
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


// @desc    Create new human resource record
// @route   POST /api/humanresources
// @access  Private
const createHumanResourceRecord = async (req, res) => {
    try {
        // Create a new human resource record based on the request body data
        const humanResourceRecord = await HumanResource.create(req.body);

        // Send success response with the created human resource record data
        res.status(201).json({
            success: true,
            data: humanResourceRecord
        });
    } catch (error) {
        // Send error response if there is a problem with creating the human resource record
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};


// @desc    Update human resource record by ID
// @route   PUT /api/humanresources/:id
// @access  Private
const updateHumanResourceById = async (req, res) => {
    try {
        const humanResource = await HumanResource.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        // Send success response with updated human resource data
        res.status(200).json({
            success: true,
            data: humanResource
        });
    } catch (error) {
        // Send error response if there is a problem with updating the human resource data
        if (error.kind === 'ObjectId') {
            res.status(404).json({
                success: false,
                error: `Human resource not found with ID: ${req.params.id}`
            });
        } else {
            res.status(500).json({
                success: false,
                error: `Server error: ${error.message}`
            });
        }
    }
};


// @desc    Delete human resource record by ID
// @route   DELETE /api/humanresources/:id
// @access  Private
const deleteHumanResource = async (req, res) => {
    try {
        // Find and delete a human resource record by its ID in the database
        const deletedHumanResource = await HumanResource.findByIdAndDelete(req.params.id);

        // Send success response with deleted human resource record data
        res.status(200).json({
            success: true,
            message: `Human resource record with ID ${req.params.id} has been deleted`,
            data: deletedHumanResource
        });
    } catch (error) {
        // Send error response if there is a problem with deleting the human resource record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Human resource record not found with ID: ${req.params.id}`
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
    getHumanResources,
    getHumanResourceById,
    createHumanResourceRecord,
    updateHumanResourceById,
    deleteHumanResource
};
