const mongoose = require('mongoose');

const campusSafetySchema = new mongoose.Schema({
  incidentID: { type: String, required: true },
  incidentDate: { type: Date, required: true },
  incidentType: { type: String, required: true },
  incidentLocation: { type: String, required: true },
  incidentDescription: { type: String, required: true },
  responseTime: { type: Number, required: true },
  evacuationPlanReport: { type: String, required: true },
  incidentReport: { type: String, required: true },
  securityCameraReport: { type: String, required: true },
  emergencyResponseReport: { type: String, required: true },
  incidentTrendAnalysis: { type: String, required: true },
  incidentFeedbackReport: { type: String, required: true },
  incidentImprovementPlan: { type: String, required: true },
  visitorManagementReport: { type: String, required: true },
  incidentStatisticsReport: { type: String, required: true },
  incidentResolutionReport: { type: String, required: true },
});

const CampusSafety = mongoose.model('CampusSafety', campusSafetySchema);

const createIncident = async (incidentData) => {
  const campusSafety = new CampusSafety(incidentData);

  try {
    const result = await campusSafety.save();
    console.log(`New incident created with ID: ${result.incidentID}`);
    return result;
  } catch (error) {
    console.error(`Error creating new incident: ${error.message}`);
    throw error;
  }
};

module.exports = createIncident;
