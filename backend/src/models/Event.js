const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventID: { type: String, required: true },
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventLocation: { type: String, required: true },
  eventType: { type: String, required: true },
  eventBudget: { type: Number, required: true },
  attendeeList: { type: [String], required: true },
  attendanceReport: { type: String, required: true },
  eventFeedbackReport: { type: String, required: true },
  eventTrendAnalysis: { type: String, required: true },
  eventPlanningReport: { type: String, required: true },
  eventCommunicationsReport: { type: String, required: true },
  eventBudgetReport: { type: String, required: true },
  eventOutcomeReport: { type: String, required: true },
  eventEvaluationReport: { type: String, required: true }
});

const Event = mongoose.model('Event', eventSchema);

const createEvent = async (eventData) => {
  const event = new Event(eventData);

  try {
    const result = await event.save();
    console.log(`New event created with ID: ${result.eventID}`);
    return result;
  } catch (error) {
    console.error(`Error creating new event: ${error.message}`);
    throw error;
  }
};

module.exports = createEvent;
