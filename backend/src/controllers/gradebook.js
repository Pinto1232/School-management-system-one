const Gradebook = require('../models/Gradebook');


// Helper function to validate admin data
const validateAdminData = (student, course, assignments, overallGrade) => {
    const errors = [];
    if (!student) errors.push('Student is required');
    if (!course) errors.push('Course is required');
    if (!assignments) errors.push('Assignments are required');
    if (!overallGrade) errors.push('Overall grade is required');

    return errors;
};


// Create a new Gradebook entry
const createGradebookEntry = async (req, res) => {
    try {
        const { student, course, assignments, overallGrade } = req.body;

        const errors = validateAdminData(student, course, assignments, overallGrade);
        if (errors.length > 0) return res.status(400).json({ errors });

        const newGradebookEntry = new Gradebook({ student, course, assignments, overallGrade });
        await newGradebookEntry.save();

        res.status(201).json({ message: 'Gradebook entry created', gradebookEntry: newGradebookEntry });
    } catch (error) {
        res.status(400).json({ message: 'Error creating gradebook entry', error });
    }
};



// Get all Gradebook entries
const getAllGradebookEntries = async (req, res) => {
    try {
        const gradebookEntries = await Gradebook.find().populate('student course');
        res.status(200).json({ gradebookEntries });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching gradebook entries', error });
    }
};

// Get a Gradebook entry by ID
const getGradebookEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        const gradebookEntry = await Gradebook.findById(id).populate('student course');

        if (!gradebookEntry) {
            return res.status(404).json({ message: 'Gradebook entry not found' });
        }

        res.status(200).json({ gradebookEntry });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching gradebook entry', error });
    }
};

// Update a Gradebook entry
const updateGradebookEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { student, course, assignments, overallGrade } = req.body;

        const updatedGradebookEntry = await Gradebook.findByIdAndUpdate(
            id,
            { student, course, assignments, overallGrade },
            { new: true, runValidators: true }
        ).populate('student course');

        res.status(200).json({ message: 'Gradebook entry updated', gradebookEntry: updatedGradebookEntry });
    } catch (error) {
        res.status(400).json({ message: 'Error updating gradebook entry', error });
    }
};

// Delete a Gradebook entry
const deleteGradebookEntry = async (req, res) => {
    try {
        const { id } = req.params;
        await Gradebook.findByIdAndDelete(id);

        res.status(200).json({ message: 'Gradebook entry deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting gradebook entry', error });
    }
};

// Export the controller methods
module.exports = {
    createGradebookEntry,
    getAllGradebookEntries,
    getGradebookEntryById,
    updateGradebookEntry,
    deleteGradebookEntry,
};
