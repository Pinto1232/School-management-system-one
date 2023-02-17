const mongoose = require('mongoose');

const parentCommunicationSchema = new mongoose.Schema({
  parentID: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  studentName: { type: String, required: true },
  studentClass: { type: String, required: true },
  studentSection: { type: String, required: true },
  parentTeacherConferenceReport: { type: String, required: true },
  newsletterReport: { type: String, required: true },
  volunteerHourReport: { type: String, required: true },
  parentFeedbackReport: { type: String, required: true },
  parentTrendAnalysis: { type: String, required: true },
  parentParticipationReport: { type: String, required: true },
  parentCommunicationReport: { type: String, required: true },
  parentSatisfactionReport: { type: String, required: true },
  parentVolunteerReport: { type: String, required: true }
});

const ParentCommunication = mongoose.model('ParentCommunication', parentCommunicationSchema);

const createParentCommunication = async (parentCommunicationData) => {
  const parentCommunication = new ParentCommunication(parentCommunicationData);

  try {
    const result = await parentCommunication.save();
    console.log(`New ParentCommunication created with ID: ${result.parentID}`);
    return result;
  } catch (error) {
    console.error(`Error creating new ParentCommunication: ${error.message}`);
    throw error;
  }
};

module.exports = createParentCommunication;
