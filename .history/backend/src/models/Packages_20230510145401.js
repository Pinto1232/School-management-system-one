const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  images: {
    type: [{
      data: Buffer,
      contentType: String,
      url: String,
    }],
    required: true,
  },
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;