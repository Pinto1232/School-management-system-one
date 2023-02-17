const Sport = require("../models/Sport")


// @desc    Get all sport records
// @route   GET /api/sport
// @access  Private
const getSportRecords = async (req, res) => {
    try {
        // Find all sport records in the database
        const sportRecords = await Sport.find();

        // Send success response with the array of sport record data
        res.status(200).json({
            success: true,
            data: sportRecords
        });
    } catch (error) {
        // Send error response if there is a problem with finding the sport records
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};


// @desc    Get single sport record by ID
// @route   GET /api/sport/:id
// @access  Public
const getSportById = async (req, res) => {
    try {
        // Find a sport record by its ID in the database
        const sportRecord = await Sport.findById(req.params.id);

        // Send success response with the sport record data
        res.status(200).json({
            success: true,
            data: sportRecord
        });
    } catch (error) {
        // Send error response if there is a problem with finding the sport record
        res.status(404).json({
            success: false,
            error: `Sport record not found with ID: ${req.params.id}`
        });
    }
};


// @desc    Create new sport record
// @route   POST /api/sport
// @access  Private
const createSportRecord = async (req, res) => {
    try {
        // Create a new sport record from the request body
        const sportRecord = new Sport(req.body);

        // Save the new sport record to the database
        await sportRecord.save();

        // Send success response with the new sport record data
        res.status(201).json({
            success: true,
            data: sportRecord
        });
    } catch (error) {
        // Send error response if there is a problem with creating the new sport record
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};


// @desc    Update sport record by ID
// @route   PUT /api/sport/:id
// @access  Private
const updateSportRecord = async (req, res) => {
    try {
        // Find and update a sport record by its ID in the database
        const sportRecord = await Sport.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Send success response with the updated sport record data
        res.status(200).json({
            success: true,
            data: sportRecord
        });
    } catch (error) {
        // Send error response if there is a problem with updating the sport record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Sport record not found with ID: ${req.params.id}`
            });
        } else {
            // Handle all other errors
            res.status(500).json({
                success: false,
                error: `Server error: ${error.message}`
            });
        }
    }
}


// @desc    Delete sport record by ID
// @route   DELETE /api/sport/:id
// @access  Private
const deleteSportRecord = async (req, res) => {
    try {
      // Find the sport record by its ID and remove it from the database
      const deletedSportRecord = await Sport.findByIdAndRemove(req.params.id);
  
      // Send success response with the deleted sport record data
      res.status(200).json({
        success: true,
        data: deletedSportRecord
      });
    } catch (error) {
      // Send error response if there is a problem with deleting the sport record
      if (error.kind === 'ObjectId') {
        // Handle a specific error where the provided ID is not valid
        res.status(404).json({
          success: false,
          error: `Sport record not found with ID: ${req.params.id}`
        });
      } else {
        res.status(500).json({
          success: false,
          error: `Server error: ${error.message}`
        });
      }
    }
  };


  // @desc    Delete sport record by sportsName
// @route   DELETE /api/sport/:sportsName
// @access  Private
const deleteSportRecordBySportsName = async (req, res) => {
    try {
      // Find and delete a sport record by its sportsName in the database
      const sportRecord = await Sport.findOneAndDelete({ sportsName: req.params.sportsName });
  
      // Send success response with the deleted sport record data
      res.status(200).json({
        success: true,
        data: sportRecord
      });
    } catch (error) {
      // Send error response if there is a problem with deleting the sport record
      res.status(500).json({
        success: false,
        error: `Server error: ${error.message}`
      });
    }
  };
  

// Export the function
module.exports = {
    getSportRecords,
    getSportById,
    createSportRecord,
    updateSportRecord,
    deleteSportRecord,
    deleteSportRecordBySportsName
};
