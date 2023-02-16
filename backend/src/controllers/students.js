const Student = require("../models/Student")



// @desc    Get all student records
// @route   GET /api/students
// @access  Private
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error: ' + error.message });
    }
}



// @desc    Get a single student record by ID
// @route   GET /api/students/:id
// @access  Private
const getStudentById = async (req, res) => {
    try {
        // Find a single student by ID in the database
        const student = await Student.findById(req.params.id);

        // Check if a student with the provided ID was found
        if (!student) {
            return res.status(404).json({
                success: false,
                error: `Student not found with ID: ${req.params.id}`
            });
        }

        // Send success response with the student data
        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        // Send error response if there is a problem with getting the student
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
}


// @desc    Get single student record by firstName
// @route   GET /api/students/firstName/:firstName
// @access  Public
const getStudentByFirstName = async (req, res) => {
    try {
        const student = await Student.findOne({ firstName: req.params.firstName });

        // If no student with the given first name is found, send a 404 error response
        if (!student) {
            return res.status(404).json({
                success: false,
                error: `Student not found with first name: ${req.params.firstName}`
            });
        }

        // Send success response with the student data
        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        // Send error response if there is a problem with the request
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};


// @desc    Create new student record
// @route   POST /api/student
// @access  Private
const createStudentRecord = async (req, res) => {
    try {
        // Create a new student record with data provided in the request body
        const studentRecord = await Student.create(req.body);

        // Send success response with the new student record data
        res.status(201).json({
            success: true,
            data: studentRecord
        });
    } catch (error) {
        // Send error response if there is a problem with creating the student record
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
}


// @desc    Update student record by ID
// @route   PUT /api/students/:id
// @access  Private
const updateStudentRecord = async (req, res) => {
    try {
      // Find and update a student record by its ID in the database
      const studentRecord = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
  
      // Send success response with the updated student record data
      res.status(200).json({
        success: true,
        data: studentRecord
      });
    } catch (error) {
      // Send error response if there is a problem with updating the student record
      if (error.kind === 'ObjectId') {
        // Handle a specific error where the provided ID is not valid
        res.status(404).json({
          success: false,
          error: `Student record not found with ID: ${req.params.id}`
        });
      } else {
        res.status(500).json({
          success: false,
          error: `Server error: ${error.message}`
        });
      }
    }
  };



  // @desc    Delete student record by ID
// @route   DELETE /api/student/:id
// @access  Private
const deleteStudentRecord = async (req, res) => {
    try {
      // Find the student record by its ID and delete it from the database
      const student = await Student.findByIdAndDelete(req.params.id);
  
      // Send success response with the deleted student record data
      res.status(200).json({
        success: true,
        data: student
      });
    } catch (error) {
      // Send error response if there is a problem with deleting the student record
      if (error.kind === 'ObjectId') {
        // Handle a specific error where the provided ID is not valid
        res.status(404).json({
          success: false,
          error: `Student record not found with ID: ${req.params.id}`
        });
      } else {
        res.status(500).json({
          success: false,
          error: `Server error: ${error.message}`
        });
      }
    }
  };
  

module.exports = {
    getAllStudents,
    getStudentById,
    getStudentByFirstName,
    createStudentRecord,
    updateStudentRecord,
    deleteStudentRecord
};
