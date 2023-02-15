// Import the Mongoose library and create a new schema for the Classroom model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
  classroomID: { type: String, required: true },
  classroomNumber: { type: String, required: true },
  capacity: { type: Number, required: true },
  schedule: { type: String, required: true },
  equipmentList: [String],
  equipmentUsageReport: { type: String, default: "" },
  classroomAssignmentReport: { type: String, default: "" },
  classroomFeedbackReport: { type: String, default: "" },
  classroomTrendAnalysis: { type: String, default: "" },
  classroomEquipmentMaintenanceReport: { type: String, default: "" },
  classroomEquipmentAvailabilityReport: { type: String, default: "" },
  classroomEquipmentUtilizationReport: { type: String, default: "" },
  classroomEquipmentAllocationReport: { type: String, default: "" },
  classroomSeatingArrangementReport: { type: String, default: "" },
  classroomCleanlinessReport: { type: String, default: "" },
  classroomComfortReport: { type: String, default: "" },
  classroomLightingReport: { type: String, default: "" }
});

// Create a new model using the classroomSchema
const Classroom = mongoose.model('Classroom', classroomSchema);

// Define a function that creates a new Classroom instance and saves it to the database
const createClass = async () => {
  try {
    // Create a new instance of the Classroom model with some example values
    const classroom = new Classroom({
      classroomID: 'ABC123',
      classroomNumber: '101',
      capacity: 30,
      schedule: 'MWF 9-11am',
      equipmentList: ['projector', 'whiteboard'],
      classroomComfortReport: 'Good'
    });

    // Save the new classroom instance to the database
    const result = await classroom.save();
    console.log(result); // Log the saved classroom object to the console

  } catch (err) {
    console.error(err); // Log any errors to the console
  }
}

// Export the createClass function so it can be used in other modules
module.exports = createClass;
