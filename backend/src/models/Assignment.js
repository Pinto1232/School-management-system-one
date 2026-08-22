const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isSubmitted: {
    type: Boolean,
    required: true,
    default: false
  }
});

assignmentSchema.index({ schoolId: 1, id: 1 }, { unique: true });

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
