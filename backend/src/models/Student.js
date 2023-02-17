const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Student model
const studentSchema = new Schema({
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
    type: Number,
    required: true,
  },
  attendancePercentage: {
    type: Number,
    required: true,
  },
  reportCard: {
    type: Object,
    required: true,
  },
  favoriteTeacher: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher' 
  },
});

// Compile the schema into a model
const Student = mongoose.model('Student', studentSchema);

// Function to create a new instance of the Student model and save it to the database
const createStudent = async () => {
  try {
    const newStudent = new Student({
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('2000-01-01'),
      gender: 'Male',
      address: '123 Main St, Anytown USA 12345',
      contactNumber: '555-555-5555',
      parentName: 'Jane Doe',
      parentContactNumber: '555-555-5556',
      academicYear: '2022-2023',
      class: '10th Grade',
      section: 'A',
      rollNumber: 1,
      attendancePercentage: 95,
      reportCard: {
        'English': 'A',
        'Math': 'B',
        'Science': 'A',
        'History': 'C',
        'Physical Education': 'A'
      },
    });
  
    await newStudent.save();
    console.log('Student saved successfully');
  } catch (error) {
    console.log('Error saving student:', error);
  }
};

// Export the createStudent function
module.exports = createStudent;
