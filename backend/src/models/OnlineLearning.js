const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  assignmentName: { type: String, required: true },
  assignmentType: { type: String, required: true },
  assignmentDate: { type: Date, required: true },
  assignmentFeedback: { type: String, required: true },
  studentProgressReport: { type: String, required: true },
  studentPerformanceReport: { type: String, required: true },
  studentTrendAnalysis: { type: String, required: true },
  studentImprovementPlan: { type: String, required: true },
  studentFeedbackReport: { type: String, required: true },
  studentInstructorCommunicationReport: { type: String, required: true },
});

const studentSchema = new mongoose.Schema({
  studentID: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  academicYear: { type: String, required: true },
  class: { type: String, required: true },
  section: { type: String, required: true },
  rollNumber: { type: Number, required: true },
  assignments: [assignmentSchema]
});

const Student = mongoose.model('Student', studentSchema);

const createStudent = async (studentData) => {
  const student = new Student(studentData);

  try {
    const result = await student.save();
    console.log(`New student created with ID: ${result.studentID}`);
    return result;
  } catch (error) {
    console.error(`Error creating new student: ${error.message}`);
    throw error;
  }
};

module.exports = createStudent;
