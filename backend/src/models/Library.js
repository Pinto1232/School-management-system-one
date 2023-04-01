const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
  },
  totalBooks: {
    type: Number,
    required: [true, 'Total number of books is required'],
  },
  sections: [
    {
      name: {
        type: String,
        required: [true, 'Section name is required'],
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
    },
  ],
  openHours: {
    type: String,
    required: [true, 'Opening hours are required'],
    trim: true,
  },
  closeHours: {
    type: String,
    required: [true, 'Closing hours are required'],
    trim: true,
  },
  contact: {
    phoneNumber: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Library = mongoose.model('Library', librarySchema);
module.exports = Library;
