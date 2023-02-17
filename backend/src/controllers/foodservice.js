const FoodService = require('../models/FoodService');

// @desc    Get all food service records
// @route   GET /api/foodservice
// @access  Public
const getFoodServiceRecords = async (req, res) => {
    try {
        // Fetch all food service records from the database
        const foodServiceRecords = await FoodService.find();

        // Send success response with the food service records data
        res.status(200).json({
            success: true,
            count: foodServiceRecords.length,
            data: foodServiceRecords
        });
    } catch (error) {
        // Send error response if there is a problem with fetching the food service records data
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};


// @desc    Get single foodservice record by ID
// @route   GET /api/foodservices/:id
// @access  Public
const getFoodServiceById = async (req, res) => {
    try {
        // Fetch a single foodservice record by its ID from the database
        const foodService = await FoodService.findById(req.params.id);

        // Send success response with the foodservice data
        res.status(200).json({
            success: true,
            data: foodService
        });
    } catch (error) {
        // Send error response if there is a problem with fetching the foodservice data
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Foodservice not found with ID: ${req.params.id}`
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



// @desc    Create new foodservice record
// @route   POST /api/foodservices
// @access  Private
const createFoodServiceRecord = async (req, res) => {
    try {
        // Create a new foodservice record based on the request body data
        const foodService = await FoodService.create(req.body);

        // Send success response with the created foodservice record data
        res.status(201).json({
            success: true,
            data: foodService
        });
    } catch (error) {
        // Send error response if there is a problem with creating the foodservice record
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};


// @desc    Update foodservice record by ID
// @route   PUT /api/foodservices/:id
// @access  Private
const updateFoodService = async (req, res) => {
    try {
        // Find and update a food service record by its ID in the database
        const foodService = await FoodService.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Send success response with the updated food service data
        res.status(200).json({
            success: true,
            data: foodService
        });
    } catch (error) {
        // Send error response if there is a problem with updating the food service record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Food service record not found with ID: ${req.params.id}`
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



// @desc    Delete foodservice record by ID
// @route   DELETE /api/foodservices/:id
// @access  Private
const deleteFoodServiceRecord = async (req, res) => {
    try {
        // Find and delete a foodservice record by its ID in the database
        const foodServiceRecord = await FoodService.findByIdAndDelete(req.params.id);

        // Send success response with the deleted foodservice record data
        res.status(200).json({
            success: true,
            data: foodServiceRecord
        });
    } catch (error) {
        // Send error response if there is a problem with deleting the foodservice record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Foodservice record not found with ID: ${req.params.id}`
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
    getFoodServiceRecords,
    getFoodServiceById,
    createFoodServiceRecord,
    updateFoodService,
    deleteFoodServiceRecord
};
