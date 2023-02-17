const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Enrollment model
const enrollmentSchema = new Schema({
  enrollmentId: {
    type: String,
    required: true,
  },
  studentId: {
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
  parentName: {
    type: String,
    required: true,
  },
  parentContactNumber: {
    type: String,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  feesPaid: {
    type: Number,
    required: true,
  },
  applicationStatus: {
    type: String,
    required: true,
  },
});

// Compile the schema into a model
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

// Function to create a new instance of the Enrollment model and save it to the database
const createEnrollment = async () => {
  try {
    const newEnrollment = new Enrollment({
      enrollmentId: 'E12345',
      studentId: 'S12345',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date(),
      gender: 'Male',
      address: '123 Main St.',
      contactNumber: '555-555-1212',
      parentName: 'Jane Doe',
      parentContactNumber: '555-555-1212',
      academicYear: '2022-2023',
      class: '10th Grade',
      section: 'A',
      rollNumber: '10A-001',
      feesPaid: 5000,
      applicationStatus: 'Accepted',
    });
  
    await newEnrollment.save();
    console.log('Enrollment saved successfully');
  } catch (error) {
    console.log('Error saving enrollment:', error);
  }
};

// Export the createEnrollment function
module.exports = createEnrollment;
