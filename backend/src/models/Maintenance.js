const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  maintenanceRequestID: {
    type: String,
    required: true
  },
  requestDate: {
    type: Date,
    required: true
  },
  requestType: {
    type: String,
    required: true
  },
  requestLocation: {
    type: String,
    required: true
  },
  requestDescription: {
    type: String,
    required: true
  },
  workOrderID: {
    type: String,
    required: true
  },
  workOrderDate: {
    type: Date,
    required: true
  },
  equipmentID: {
    type: String,
    required: true
  },
  equipmentName: {
    type: String,
    required: true
  },
  equipmentType: {
    type: String,
    required: true
  },
  equipmentLocation: {
    type: String,
    required: true
  },
  maintenanceProgressReport: {
    type: String,
    required: true
  },
  equipmentInventoryReport: {
    type: String,
    required: true
  },
  maintenanceTrendAnalysis: {
    type: String,
    required: true
  },
  maintenanceFeedbackReport: {
    type: String,
    required: true
  },
  maintenanceImprovementPlan: {
    type: String,
    required: true
  },
  maintenanceCostReport: {
    type: String,
    required: true
  }
});

const Maintenance = mongoose.model("Maintenance", maintenanceSchema);

const createMaintenance = async (
  maintenanceRequestID,
  requestDate,
  requestType,
  requestLocation,
  requestDescription,
  workOrderID,
  workOrderDate,
  equipmentID,
  equipmentName,
  equipmentType,
  equipmentLocation,
  maintenanceProgressReport,
  equipmentInventoryReport,
  maintenanceTrendAnalysis,
  maintenanceFeedbackReport,
  maintenanceImprovementPlan,
  maintenanceCostReport
) => {
  const maintenance = new Maintenance({
    maintenanceRequestID,
    requestDate,
    requestType,
    requestLocation,
    requestDescription,
    workOrderID,
    workOrderDate,
    equipmentID,
    equipmentName,
    equipmentType,
    equipmentLocation,
    maintenanceProgressReport,
    equipmentInventoryReport,
    maintenanceTrendAnalysis,
    maintenanceFeedbackReport,
    maintenanceImprovementPlan,
    maintenanceCostReport
  });

  try {
    const result = await maintenance.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = createMaintenance;
