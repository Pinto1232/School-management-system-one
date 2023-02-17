const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Attendance model
const attendanceSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
  },
  presentAbsent: {
    type: String,
    required: true,
  },
  reasonForAbsence: {
    type: String,
    required: false,
  },
  class: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  attendancePercentage: {
    type: Number,
    required: true,
  },
  monthlyAttendanceReport: {
    type: Object,
    required: true,
  },
  attendanceRecordForAcademicYear: {
    type: Object,
    required: true,
  },
  studentAttendanceReport: {
    type: Object,
    required: true,
  },
  teacherAttendanceReport: {
    type: Object,
    required: true,
  },
  attendanceTrendAnalysis: {
    type: Object,
    required: true,
  },
  attendanceExceptionReport: {
    type: Object,
    required: true,
  },
});

// Compile the schema into a model
const Attendance = mongoose.model('Attendance', attendanceSchema);

// Function to create a new instance of the Attendance model and save it to the database
const createAttendance = async () => {
  try {
    const newAttendance = new Attendance({
      date: new Date(),
      studentId: 'S12345',
      teacherId: 'T12345',
      presentAbsent: 'Present',
      class: '10th Grade',
      section: 'A',
      attendancePercentage: 100,
      monthlyAttendanceReport: {
        'January': '100%',
        'February': '100%',
        'March': '100%',
      },
      attendanceRecordForAcademicYear: {
        '2022-2023': '100%',
        '2021-2022': '95%',
        '2020-2021': '90%'
      },
      studentAttendanceReport: {
        'John Doe': '100%'
      },
      teacherAttendanceReport: {
        'Jane Doe': '100%'
      },
      attendanceTrendAnalysis: {
        'Overall Trend': 'Increasing'
      },
      attendanceExceptionReport: {
        'John Doe': 'N/A'
      },
    });
  
    await newAttendance.save();
    console.log('Attendance saved successfully');
  } catch (error) {
    console.log('Error saving attendance:', error);
  }
};

// Export the createAtt
module.exports = createAttendance;