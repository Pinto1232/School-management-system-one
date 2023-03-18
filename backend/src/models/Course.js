const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        prerequisites: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
            },
        ],
        duration: {
            type: Number,
            required: true,
            min: 1,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
            min: 1,
        },
        enrolledStudents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
            },
        ],
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
