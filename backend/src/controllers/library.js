const Library = require('../models/Library');

// Create a new library
exports.createLibrary = async (req, res) => {
  try {
    const library = new Library(req.body);
    await library.save();
    res.status(201).json({ success: true, data: library });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all libraries
exports.getAllLibraries = async (req, res) => {
  try {
    const libraries = await Library.find();
    res.status(200).json({ success: true, data: libraries });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get a single library by ID
exports.getLibraryById = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id);
    if (!library) {
      return res.status(404).json({ success: false, message: 'Library not found' });
    }
    res.status(200).json({ success: true, data: library });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a library by ID
exports.updateLibrary = async (req, res) => {
  try {
    const library = await Library.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!library) {
      return res.status(404).json({ success: false, message: 'Library not found' });
    }
    res.status(200).json({ success: true, data: library });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a library by ID
exports.deleteLibrary = async (req, res) => {
  try {
    const library = await Library.findByIdAndDelete(req.params.id);
    if (!library) {
      return res.status(404).json({ success: false, message: 'Library not found' });
    }
    res.status(204).json({ success: true, data: null });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
