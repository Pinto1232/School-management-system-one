const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Server error: ${error.message}`
    });
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.status(404).json({
        success: false,
        error: `Event not found with ID: ${req.params.id}`
      });
    } else {
      res.status(500).json({
        success: false,
        error: `Server error: ${error.message}`
      });
    }
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private
const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Server error: ${error.message}`
    });
  }
};

// @desc    Update event by ID
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.status(404).json({
        success: false,
        error: `Event not found with ID: ${req.params.id}`
      });
    } else {
      res.status(500).json({
        success: false,
        error: `Server error: ${error.message}`
      });
    }
  }
};

// @desc    Delete event by ID
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        error: `Event not found with ID: ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.status(404).json({
        success: false,
        error: `Event not found with ID: ${req.params.id}`
      });
    } else {
      res.status(500).json({
        success: false,
        error: `Server error: ${error.message}`
      });
    }
  }
};

module.exports = {getEvents, getEventById, createEvent, updateEvent, deleteEvent};
