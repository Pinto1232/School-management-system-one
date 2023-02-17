const Gradebook = require('../models/Gradebook');

// @desc    Get all grade book records
// @route   GET /api/gradebooks
// @access  Public
const getGradebooks = async (req, res) => {
    try {
        // Fetch all grade book records from the database
        const gradebooks = await Gradebook.find();

        // Send success response with the grade book records data
        res.status(200).json({
            success: true,
            count: gradebooks.length,
            data: gradebooks
        });
    } catch (error) {
        // Send error response if there is a problem with fetching the grade book records data
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};

// @desc    Get single grade book record by ID
// @route   GET /api/gradebook/:id
// @access  Public
const getGradeById = async (req, res) => {
    try {
        // Find a single grade book record by its ID in the database
        const grade = await Gradebook.findById(req.params.id);

        // Send success response with the grade data
        res.status(200).json({
            success: true,
            data: grade
        });
    } catch (error) {
        // Send error response if there is a problem with fetching the grade data
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Grade book record not found with ID: ${req.params.id}`
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


// @desc    Create new grade book record
// @route   POST /api/gradebooks
// @access  Private
const createGradebookRecord = async (req, res) => {
    try {
        // Create a new grade book record based on the request body data
        const gradebookRecord = await Gradebook.create(req.body);

        // Send success response with the created grade book record data
        res.status(201).json({
            success: true,
            data: gradebookRecord
        });
    } catch (error) {
        // Send error response if there is a problem with creating the grade book record
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};


// @desc    Update gradebook record by ID
// @route   PUT /api/gradebooks/:id
// @access  Private
const updateGradebook = async (req, res) => {
    try {
        // Find and update a gradebook record by its ID in the database
        const gradebook = await Gradebook.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Send success response with the updated gradebook record data
        res.status(200).json({
            success: true,
            data: gradebook
        });
    } catch (error) {
        // Send error response if there is a problem with updating the gradebook record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Gradebook record not found with ID: ${req.params.id}`
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


// @desc    Delete Gradebook record by ID
// @route   DELETE /api/gradebooks/:id
// @access  Private
const deleteGradebookRecord = async (req, res) => {
    try {
        // Find and remove a Gradebook record by its ID from the database
        const deletedRecord = await Gradebook.findByIdAndRemove(req.params.id);

        // Send success response with the deleted record data
        res.status(200).json({
            success: true,
            data: deletedRecord
        });
    } catch (error) {
        // Send error response if there is a problem with deleting the record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Gradebook record not found with ID: ${req.params.id}`
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
    getGradebooks,
    getGradeById,
    createGradebookRecord,
    updateGradebook,
    deleteGradebookRecord
};
