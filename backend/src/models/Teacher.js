const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  teacherId: {
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
  classSchedules: {
    type: Object,
    required: true,
  },
  attendancePercentage: {
    type: Number,
    required: true,
  },
  performanceEvaluations: {
    type: Object,
    required: true,
  },
  salaryInformation: {
    type: Object,
    required: true,
  },
});

const Teacher = mongoose.model('Teacher', teacherSchema);

const createTeacher = async () => {
  try {
    const newTeacher = new Teacher({
      teacherId: 'T12345',
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfBirth: new Date('1980-01-01'),
      gender: 'Female',
      address: '456 Main St, Anytown USA 12345',
      contactNumber: '555-555-5557',
      qualification: 'Masters in Education',
      department: 'English',
      designation: 'Assistant Professor',
      teachingExperience: 10,
      classSchedules: {
        'Monday': ['English 101', 'English 102'],
        'Tuesday': ['English 101', 'English 102'],
        'Wednesday': ['English 101'],
        'Thursday': ['English 102'],
        'Friday': []
      },
      attendancePercentage: 100,
      performanceEvaluations: {
        'Academic Year 2022-2023': 'Excellent',
        'Academic Year 2021-2022': 'Very Good',
        'Academic Year 2020-2021': 'Good'
      },
      salaryInformation: {
        'Basic Salary': 50000,
        'House Rent Allowance': 10000,
        'Medical Allowance': 5000,
        'Transportation Allowance': 3000
      },
    });
  
    await newTeacher.save();
    console.log('Teacher saved successfully');
  } catch (error) {
    console.log('Error saving teacher:', error);
  }
};
