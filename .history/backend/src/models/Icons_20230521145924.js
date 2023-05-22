const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IconSchema = new Schema({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

const Icon = mongoose.model('Icon', IconSchema);

module.exports = Icon;