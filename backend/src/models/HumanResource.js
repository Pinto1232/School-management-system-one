const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the HumanResource model
const humanResourceSchema = new Schema({
  employeeId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  teachingExperience: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  payrollReport: {
    type: Object,
    required: true,
  },
  employeePerformanceReport: {
    type: Object,
    required: true,
  },
  employeeTrainingReport: {
    type: Object,
    required: true,
  },
  employeeBenefitReport: {
    type: Object,
    required: true,
  },
});

// Compile the schema into a model
const HumanResource = mongoose.model('HumanResource', humanResourceSchema);

// Function to create a new instance of the HumanResource model and save it to the database
const createHumanResource = async () => {
  try {
    const newHumanResource = new HumanResource({
      employeeId: 'E12345',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date(),
      gender: 'Male',
      address: '123 Main St',
      contactNumber: '123-456-7890',
      qualification: 'Bachelor of Science',
      department: 'Mathematics',
      designation: 'Teacher',
      teachingExperience: 5,
      salary: 75000,
      payrollReport: {},
      employeePerformanceReport: {},
      employeeTrainingReport: {},
      employeeBenefitReport: {},
    });
  
    await newHumanResource.save();
    console.log('Human Resource saved successfully');
  } catch (error) {
    console.log('Error saving Human Resource:', error);
  }
};

// Export the createHumanResource function
module.exports = createHumanResource;
