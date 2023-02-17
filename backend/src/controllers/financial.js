const Financial = require('../models/Financial');

// @desc    Get all financial records
// @route   GET /api/financial
// @access  Public
const getFinancialRecords = async (req, res) => {
  try {
    // Fetch all financial records from the database
    const financialRecords = await Financial.find();

    // Send success response with the financial records data
    res.status(200).json({
      success: true,
      count: financialRecords.length,
      data: financialRecords
    });
  } catch (error) {
    // Send error response if there is a problem with fetching the financial records data
    res.status(500).json({
      success: false,
      error: `Server error: ${error.message}`
    });
  }
};

// @desc    Get single financial record by ID
// @route   GET /api/financial/:id
// @access  Public
const getFinancialRecordById = async (req, res) => {
  try {
    // Fetch a single financial record by its ID from the database
    const financialRecord = await Financial.findById(req.params.id);

    // Send success response with the financial record data
    res.status(200).json({
      success: true,
      data: financialRecord
    });
  } catch (error) {
    // Send error response if there is a problem with fetching the financial record data
    if (error.kind === 'ObjectId') {
      // Handle a specific error where the provided ID is not valid
      res.status(404).json({
        success: false,
        error: `Financial record not found with ID: ${req.params.id}`
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

// @desc    Create new financial record
// @route   POST /api/financial
// @access  Private
const createFinancialRecord = async (req, res) => {
  try {
    // Create a new financial record based on the request body data
    const financialRecord = await Financial.create(req.body);

    // Send success response with the created financial record data
    res.status(201).json({
      success: true,
      data: financialRecord
    });
  } catch (error) {
    // Send error response if there is a problem with creating the financial record
    res.status(500).json({
      success: false,
      error: `Server error: ${error.message}`
    });
  }
};


// @desc    Update financial record by ID
// @route   PUT /api/financial/:id
// @access  Private
const updateFinancialRecord = async (req, res) => {
    try {
      // Find and update a financial record by its ID in the database
      const financialRecord = await Financial.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
  
      // Send success response with the updated financial record data
      res.status(200).json({
        success: true,
        data: financialRecord,
      });
    } catch (error) {
      // Send error response if there is a problem with updating the financial record
      if (error.kind === 'ObjectId') {
        // Handle a specific error where the provided ID is not valid
        res.status(404).json({
          success: false,
          error: `Financial record not found with ID: ${req.params.id}`,
        });
      } else {
        // Handle general errors
        res.status(500).json({
          success: false,
          error: `Server error: ${error.message}`,
        });
      }
    }
  };
  



// @desc    Delete financial record by ID
// @route   DELETE /api/financial/:id
// @access  Private
const deleteFinancialRecord = async (req, res) => {
    try {
      // Find and delete a financial record by its ID from the database
      const deletedRecord = await Financial.findByIdAndDelete(req.params.id);
  
      // Send success response with deleted financial record data
      res.status(200).json({
        success: true,
        data: deletedRecord
      });
    } catch (error) {
      // Send error response if there is a problem with deleting the financial record
      if (error.kind === 'ObjectId') {
        // Handle a specific error where the provided ID is not valid
        res.status(404).json({
          success: false,
          error: `Financial record not found with ID: ${req.params.id}`
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
  
  // Export the controller functions for use in the routes
  module.exports = {
    getFinancialRecords,
    getFinancialRecordById,
    createFinancialRecord,
    updateFinancialRecord,
    deleteFinancialRecord
  };
  