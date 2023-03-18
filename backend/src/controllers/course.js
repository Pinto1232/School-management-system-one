const Course = require('../models/Course');

// Helper function to validate course data
const validateCourseData = (title, description, duration, startDate, endDate, capacity) => {
    const errors = [];
    if (!title) errors.push('Title is required');
    if (!description) errors.push('Description is required');
    if (!duration) errors.push('Duration is required');
    if (!startDate) errors.push('Start date is required');
    if (!endDate) errors.push('End date is required');
    if (!capacity) errors.push('Capacity is required');

    return errors;
};

// Create a new course
const createCourse = async (req, res, next) => {
    try {
        const { title, description, prerequisites, duration, startDate, endDate, capacity, tags } = req.body;

        const errors = validateCourseData(title, description, duration, startDate, endDate, capacity);
        if (errors.length > 0) return res.status(400).json({ errors });

        const newCourse = new Course({ title, description, prerequisites, duration, startDate, endDate, capacity, tags });
        await newCourse.save();

        res.status(201).json({ message: 'Course created', course: newCourse });
    } catch (error) {
        next(error);
    }
};

// Get all courses
const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find().populate('prerequisites enrolledStudents');
        res.status(200).json({ message: 'Courses fetched', courses });
    } catch (error) {
        next(error);
    }
};

// Get a course by ID
const getCourseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id).populate('prerequisites enrolledStudents');
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json({ message: 'Course fetched', course });
    } catch (error) {
        next(error);
    }
};

// Update a course
const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, prerequisites, duration, startDate, endDate, capacity, tags } = req.body;

        const errors = validateCourseData(title, description, duration, startDate, endDate, capacity);
        if (errors.length > 0) return res.status(400).json({ errors });

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            { title, description, prerequisites, duration, startDate, endDate, capacity, tags },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Course updated', course: updatedCourse });
    } catch (error) {
        next(error);
    }
};

// Delete a course
const deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Course.findByIdAndDelete(id);

        res.status(200).json({ message: 'Course deleted' });
    } catch (error) {
        next(error);
    }
};

// Export the controller methods
module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
};
