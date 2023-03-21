const Classroom = require('../models/Classroom');

// Helper function to validate classroom data
const validateClassroomData = (name, capacity, campus) => {
    const errors = [];
    if (!name) errors.push('Name is required');
    if (!capacity) errors.push('Capacity is required');
    if (!campus) errors.push('Campus is required');

    return errors;
};

// Create a new classroom
const createClassroom = async (req, res) => {
    try {
        const {
            name,
            capacity,
            campus,
            resources,
            teacher,
            schedule,
            type,
            accessibilityFeatures,
            building,
            floor,
        } = req.body;

        const errors = validateClassroomData(name, capacity, campus);
        if (errors.length > 0) return res.status(400).json({ errors });

        const newClassroom = new Classroom({
            name,
            capacity,
            campus,
            resources,
            teacher,
            schedule,
            type,
            accessibilityFeatures,
            building,
            floor,
        });

        await newClassroom.save();
        res.status(201).json({ message: 'Classroom created', classroom: newClassroom });
    } catch (error) {
        res.status(400).json({ message: 'Error creating classroom', error });
    }
};

// Get all classrooms
const getAllClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find().populate('campus teacher');
        res.status(200).json({ classrooms });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching classrooms', error });
    }
};

// Get a classroom by ID
const getClassroomById = async (req, res) => {
    try {
        const { id } = req.params;
        const classroom = await Classroom.findById(id).populate('campus teacher');

        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }

        res.status(200).json({ classroom });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching classroom', error });
    }
};

// Update a classroom
const updateClassroom = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            capacity,
            campus,
            resources,
            teacher,
            schedule,
            type,
            accessibilityFeatures,
            building,
            floor,
        } = req.body;

        const errors = validateClassroomData(name, capacity, campus);
        if (errors.length > 0) return res.status(400).json({ errors });

        const updatedClassroom = await Classroom.findByIdAndUpdate(
            id,
            {
                name,
                capacity,
                campus,
                resources,
                teacher,
                schedule,
                type,
                accessibilityFeatures,
                building,
                floor,
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Classroom updated', classroom: updatedClassroom });
    } catch (error) {
        res.status(400).json({ message: 'Error updating classroom', error });
    }
};

// Delete a classroom
const deleteClassroom = async (req, res) => {
    try {
        const { id } = req.params;
        await Classroom.findByIdAndDelete(id);

        res.status(200).json({ message: 'Classroom deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting classroom', error });
    }
};

// Export the controller methods
module.exports = {
    createClassroom,
    getAllClassrooms,
    getClassroomById,
    updateClassroom,
    deleteClassroom,
};
