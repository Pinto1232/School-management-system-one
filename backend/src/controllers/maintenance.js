const Maintenance = require('../models/Maintenance');

// @desc    Get all maintenance records
// @route   GET /api/maintenance
// @access  Public
const getMaintenanceRecords = async (req, res) => {
    try {
        // Fetch all maintenance records from the database
        const maintenanceRecords = await Maintenance.find();

        // Send success response with the maintenance records data
        res.status(200).json({
            success: true,
            count: maintenanceRecords.length,
            data: maintenanceRecords
        });
    } catch (error) {
        // Send error response if there is a problem with fetching the maintenance records data
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};


// @desc    Get single maintenance record by ID
// @route   GET /api/maintenance/:id
// @access  Public
const getMaintenanceById = async (req, res) => {
    try {
        // Find the maintenance record by its ID in the database
        const maintenance = await Maintenance.findById(req.params.id);

        // Send success response with the maintenance record data
        res.status(200).json({
            success: true,
            data: maintenance
        });
    } catch (error) {
        // Send error response if there is a problem with fetching the maintenance record data
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Maintenance record not found with ID: ${req.params.id}`
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


// @desc    Create new maintenance record
// @route   POST /api/maintenance
// @access  Private
const createMaintenanceRecord = async (req, res) => {
    try {
        // Create a new maintenance record based on the request body data
        const maintenanceRecord = await Maintenance.create(req.body);

        // Send success response with the created maintenance record data
        res.status(201).json({
            success: true,
            data: maintenanceRecord
        });
    } catch (error) {
        // Send error response if there is a problem with creating the maintenance record
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};


// @desc    Update maintenance record by ID
// @route   PUT /api/maintenance/:id
// @access  Private
const updateMaintenance = async (req, res) => {
    try {
        // Find and update a maintenance record by its ID in the database
        const maintenanceRecord = await Maintenance.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Send success response with the updated maintenance record data
        res.status(200).json({
            success: true,
            data: maintenanceRecord
        });
    } catch (error) {
        // Send error response if there is a problem with updating the maintenance record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Maintenance record not found with ID: ${req.params.id}`
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


// @desc    Delete maintenance record by ID
// @route   DELETE /api/maintenance/:id
// @access  Private
const deleteMaintenanceRecord = async (req, res) => {
    try {
        // Find and delete a maintenance record by its ID in the database
        const deletedRecord = await Maintenance.findByIdAndDelete(req.params.id);

        // Send success response with the deleted maintenance record data
        res.status(200).json({
            success: true,
            data: deletedRecord
        });
    } catch (error) {
        // Send error response if there is a problem with deleting the maintenance record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Maintenance record not found with ID: ${req.params.id}`
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
    getMaintenanceRecords,
    getMaintenanceById,
    createMaintenanceRecord,
    updateMaintenance,
    deleteMaintenanceRecord
};
