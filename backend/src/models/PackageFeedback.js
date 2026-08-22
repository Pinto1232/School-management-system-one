const mongoose = require('mongoose');

const packageFeedbackSchema = new mongoose.Schema({
  planKey: {
    type: String,
    required: true,
    trim: true,
    maxlength: 128,
  },
  userId: {
    type: String,
    required: true,
    immutable: true,
    index: true,
  },
  liked: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true,
});

packageFeedbackSchema.index(
  { schoolId: 1, userId: 1, planKey: 1 },
  { unique: true },
);

module.exports = mongoose.model('PackageFeedback', packageFeedbackSchema);
