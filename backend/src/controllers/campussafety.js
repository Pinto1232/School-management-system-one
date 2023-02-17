const CampusSafety = require('../models/CampusSafety');

// @desc    Get all campus safety records
// @route   GET /api/campussafety
// @access  Public
const getCampusSafety = async (req, res) => {
  try {
    const campusSafety = await CampusSafety.find();
    res.status(200).json({ success: true, data: campusSafety });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Create new campus safety record
// @route   POST /api/campussafety
// @access  Public
const createCampusSafety = async (req, res) => {
  try {
    const campusSafety = new CampusSafety(req.body);
    const result = await campusSafety.save();
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update a campus safety record by ID
// @route   PUT /api/campussafety/:id
// @access  Public
const updateCampusSafety = async (req, res) => {
  try {
    const campusSafety = await CampusSafety.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!campusSafety) {
      return res.status(404).json({ success: false, message: 'Campus safety record not found' });
    }
    res.status(200).json({ success: true, data: campusSafety });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Campus safety record not found' });
    }
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete a campus safety record by ID
// @route   DELETE /api/campussafety/:id
// @access  Public
const deleteCampusSafety = async (req, res) => {
  try {
    const campusSafety = await CampusSafety.findByIdAndDelete(req.params.id);
    if (!campusSafety) {
      return res.status(404).json({ success: false, message: 'Campus safety record not found' });
    }
    res.status(200).json({ success: true, message: 'Campus safety record deleted' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Campus safety record not found' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getCampusSafety,
  createCampusSafety,
  updateCampusSafety,
  deleteCampusSafety
};
