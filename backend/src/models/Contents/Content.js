const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    enum: ['Home', 'About', 'FAQs'],
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
  },
  description: {
    type: String,
  },
  images: [{
    type: String,
  }],
  icons: [{
    type: String,
  }],
  subHeadings: [{
    type: String,
  }],
  buttonsTitle: [{
    type: String,
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Content', ContentSchema);