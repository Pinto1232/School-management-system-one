const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  images: {
    type: [
      {
        data: Buffer,
        contentType: String,
        url: String,
      },
    ],
    required: false, // Make it optional if not always provided
  },
  studentEnrollment: {
    type: Boolean,
    default: false,
  },
  personalAcademicRecords: {
    type: Boolean,
    default: false,
  },
  attendanceTracking: {
    type: Boolean,
    default: false,
  },
  gradebookReportCards: {
    type: Boolean,
    default: false,
  },
  healthRecords: {
    type: Boolean,
    default: false,
  },
  timetableManagement: {
    type: Boolean,
    default: false,
  },
  attendanceManagement: {
    type: Boolean,
    default: false,
  },
  gradeExamManagement: {
    type: Boolean,
    default: false,
  },
  feePaymentManagement: {
    type: Boolean,
    default: false,
  },
  libraryManagement: {
    type: Boolean,
    default: false,
  },
  transportManagement: {
    type: Boolean,
    default: false,
  },
  humanResourceManagement: {
    type: Boolean,
    default: false,
  },
  communicationCollaboration: {
    type: Boolean,
    default: false,
  },
  learningManagementSystem: {
    type: Boolean,
    default: false,
  },
  parentStudentPortal: {
    type: Boolean,
    default: false,
  },
  inventoryAssetManagement: {
    type: Boolean,
    default: false,
  },
  eventManagement: {
    type: Boolean,
    default: false,
  },
  analyticsReporting: {
    type: Boolean,
    default: false,
  },
  securityAccessControl: {
    type: Boolean,
    default: false,
  },
});

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;