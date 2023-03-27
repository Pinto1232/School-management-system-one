const mongoose = require('mongoose');
const { Schema } = mongoose;

const gradebookSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    assignments: [
        {
            assignmentName: {
                type: String,
                required: true,
            },
            assignmentScore: {
                type: Number,
                required: true,
            },
            totalPoints: {
                type: Number,
                required: true,
            },
            dateSubmitted: {
                type: Date,
                required: true,
            },
            gradedDate: {
                type: Date,
                required: true,
            },
        },
    ],
    overallGrade: {
        type: Number,
        required: true,
    },
});

const Gradebook = mongoose.model('Gradebook', gradebookSchema);

module.exports = Gradebook;
