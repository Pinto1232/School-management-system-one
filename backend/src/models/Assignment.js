const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
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

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;