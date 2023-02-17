const Library = require('../models/Library');

// @desc    Get all library records
// @route   GET /api/library
// @access  Public
const getLibraryRecords = async (req, res) => {
    try {
        // Fetch all library records from the database
        const libraryRecords = await Library.find();

        // Send success response with the library records data
        res.status(200).json({
            success: true,
            count: libraryRecords.length,
            data: libraryRecords
        });
    } catch (error) {
        // Send error response if there is a problem with fetching the library records data
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};

// @desc    Get single library record by ID
// @route   GET /api/library/:id
// @access  Public
const getLibraryRecordById = async (req, res) => {
    try {
        // Fetch a single library record by its ID from the database
        const libraryRecord = await Library.findById(req.params.id);

        // Send success response with the library record data
        res.status(200).json({
            success: true,
            data: libraryRecord
        });
    } catch (error) {
        // Send error response if there is a problem with fetching the library record data
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Library record not found with ID: ${req.params.id}`
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

// @desc    Create new library record
// @route   POST /api/library
// @access  Private
const createLibraryRecord = async (req, res) => {
    try {
        // Create a new library record based on the request body data
        const libraryRecord = await Library.create(req.body);

        // Send success response with the created library record data
        res.status(201).json({
            success: true,
            data: libraryRecord
        });
    } catch (error) {
        // Send error response if there is a problem with creating the library record
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};

// @desc    Update library record by ID
// @route   PUT /api/library/:id
// @access  Private
const updateLibraryRecord = async (req, res) => {
    try {
        // Find and update a library record by its ID in the database
        const libraryRecord = await Library.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Send success response with the updated library record data
        res.status(200).json({
            success: true,
            data: libraryRecord
        });
    } catch (error) {
        // Send error response if there is a problem with updating the library record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Library record not found with ID: ${req.params.id}`
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


// @desc    Delete library record by ID
// @route   DELETE /api/library/:id
// @access  Private
const deleteLibraryRecord = async (req, res) => {
    try {
        // Find and delete a library record by its ID in the database
        const libraryRecord = await Library.findByIdAndDelete(req.params.id);

        // Send success response with the deleted library record data
        res.status(200).json({
            success: true,
            data: libraryRecord
        });
    } catch (error) {
        // Send error response if there is a problem with deleting the library record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Library record not found with ID: ${req.params.id}`
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
    getLibraryRecords,
    getLibraryRecordById,
    createLibraryRecord,
    updateLibraryRecord,
    deleteLibraryRecord 
}