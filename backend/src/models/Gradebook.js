const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Gradebook model
const gradebookSchema = new Schema({
  gradeId: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  assignmentName: {
    type: String,
    required: true,
  },
  assignmentType: {
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
  subject: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  obtainedMarks: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  reportCard: {
    type: Object,
    required: true,
  },
  transcripts: {
    type: Object,
    required: true,
  },
  studentPerformanceReport: {
    type: Object,
    required: true,
  },
  classPerformanceReport: {
    type: Object,
    required: true,
  },
});

// Compile the schema into a model
const Gradebook = mongoose.model('Gradebook', gradebookSchema);

// Function to create a new instance of the Gradebook model and save it to the database
const createGradebook = async () => {
  try {
    const newGradebook = new Gradebook({
      gradeId: 'G12345',
      studentId: 'S12345',
      assignmentName: 'Math Quiz',
      assignmentType: 'Quiz',
      class: '10th Grade',
      section: 'A',
      subject: 'Math',
      date: new Date(),
      totalMarks: 100,
      obtainedMarks: 95,
      percentage: 95,
      grade: 'A',
      reportCard: {
        'Math': 'A',
        'Science': 'B',
        'English': 'A',
      },
      transcripts: {
        'Math Quiz': '95',
        'Science Test': '90',
        'English Exam': '85',
      },
      studentPerformanceReport: {
        'John Doe': '95%'
      },
      classPerformanceReport: {
        '10th Grade A': '92%'
      },
    });
  
    await newGradebook.save();
    console.log('Gradebook saved successfully');
  } catch (error) {
    console.log('Error saving gradebook:', error);
  }
};

// Export the createGradebook function
module.exports = createGradebook;
