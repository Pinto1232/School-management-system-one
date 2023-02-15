const mongoose = require('mongoose');

const studentTrackingSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true
  },
  attendanceRecord: {
    type: Array
  },
  behaviorRecord: {
    type: Array
  },
  gradesRecord: {
    type: Array
  },
  testScoresRecord: {
    type: Array
  },
  homeworkRecord: {
    type: Array
  },
  participationRecord: {
    type: Array
  },
  performanceTrends: {
    type: Array
  },
  improvementPlan: {
    type: String
  },
  feedbackReport: {
    type: String
  },
  instructorStudentCommunicationReport: {
    type: String
  }
});

const StudentTracking = mongoose.model('StudentTracking', studentTrackingSchema);

const createStudentTracking = async (studentID, firstName, lastName, academicYear, section, rollNumber, attendanceRecord, behaviorRecord, gradesRecord, testScoresRecord, homeworkRecord, participationRecord, performanceTrends, improvementPlan, feedbackReport, instructorStudentCommunicationReport) => {
  const studentTracking = new StudentTracking({
    studentID,
    firstName,
    lastName,
    academicYear,
    section,
    rollNumber,
    attendanceRecord,
    behaviorRecord,
    gradesRecord,
    testScoresRecord,
    homeworkRecord,
    participationRecord,
    performanceTrends,
    improvementPlan,
    feedbackReport,
    instructorStudentCommunicationReport
  });

  try {
    const result = await studentTracking.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = createStudentTracking;
