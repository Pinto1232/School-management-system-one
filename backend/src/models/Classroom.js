const mongoose = require("mongoose");

const ClassroomSchema = new mongoose.Schema({
  ClassroomID: {
    type: String,
    required: true
  },
  ClassroomNumber: {
    type: String,
    required: true
  },
  Capacity: {
    type: Number,
    required: true
  },
  Schedule: {
    type: Object,
    required: true
  },
  EquipmentList: {
    type: Array,
    required: true
  },
  EquipmentUsageReport: {
    type: Object,
    required: true
  },
  ClassroomAssignmentReport: {
    type: Object,
    required: true
  },
  ClassroomFeedbackReport: {
    type: Object,
    required: true
  },
  ClassroomTrendAnalysis: {
    type: Object,
    required: true
  },
  ClassroomEquipmentMaintenanceReport: {
    type: Object,
    required: true
  },
  ClassroomEquipmentAvailabilityReport: {
    type: Object,
    required: true
  },
  ClassroomEquipmentUtilizationReport: {
    type: Object,
    required: true
  },
  ClassroomEquipmentAllocationReport: {
    type: Object,
    required: true
  },
  ClassroomSeatingArrangementReport: {
    type: Object,
    required: true
  },
  ClassroomCleanlinessReport: {
    type: Object,
    required: true
  },
  ClassroomComfortReport: {
    type: Object,
    required: true
  },
  ClassroomLightingReport: {
    type: Object,
    required: true
  }
});

const Classroom = mongoose.model("Classroom", ClassroomSchema);

// Create new instance of the Classroom model
const createClassroom = async (classroomData) => {
  const classroom = new Classroom(classroomData);
  try {
    const result = await classroom.save();
    console.log("Classroom created successfully.");
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Export the createClassroom function
module.exports = createClassroom;
