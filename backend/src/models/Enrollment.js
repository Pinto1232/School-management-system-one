const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnrollmentSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    enrollmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'withdrawn', 'suspended'],
      required: true,
    },
    // Additional fields
    finalGrade: {
      type: String,
      enum: ['A', 'B', 'C', 'D', 'E', 'F'],
    },
    attendanceRate: {
      type: Number,
      min: 0,
      max: 100,
    },
    comments: {
      type: String,
    },
    // You can add more fields here as needed
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
