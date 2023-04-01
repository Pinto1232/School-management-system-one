const multer = require('multer');
const Sport = require('../models/Sport');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Set up the multer middleware for player image uploads
exports.uploadPlayerImage = upload.single('playerImage');



// Create a new sport
exports.createSport = async (req, res) => {
    try {
        const sport = new Sport(req.body);
        await sport.save();
        res.status(201).json({ success: true, data: sport });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all sports
exports.getAllSports = async (req, res) => {
    try {
        const sports = await Sport.find();
        res.status(200).json({ success: true, data: sports });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get a single sport by ID
exports.getSportById = async (req, res) => {
    try {
        const sport = await Sport.findById(req.params.id);
        if (!sport) {
            return res.status(404).json({ success: false, message: 'Sport not found' });
        }
        res.status(200).json({ success: true, data: sport });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update a sport by ID
exports.updateSport = async (req, res) => {
    try {
        const sport = await Sport.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!sport) {
            return res.status(404).json({ success: false, message: 'Sport not found' });
        }
        res.status(200).json({ success: true, data: sport });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a sport by ID
exports.deleteSport = async (req, res) => {
    try {
        const sport = await Sport.findByIdAndDelete(req.params.id);
        if (!sport) {
            return res.status(404).json({ success: false, message: 'Sport not found' });
        }
        res.status(204).json({ success: true, data: null });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Add a player image to a sport by ID
exports.addPlayerImageToSport = async (req, res) => {
    try {
        const sport = await Sport.findById(req.params.id);
        if (!sport) {
            return res.status(404).json({ success: false, message: 'Sport not found' });
        }

        sport.playerImage = req.file.path;
        await sport.save();

        res.status(200).json({ success: true, data: sport });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
