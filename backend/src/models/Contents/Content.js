const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  display: {
    type: Boolean,
    default: false,
  },
});

const ContentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    enum: ['Home', 'About Us', 'FAQs'],
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
  images: [imageSchema],
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