const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        campus: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Campus',
            required: true,
        },
        resources: {
            type: [String],
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        schedule: {
            type: [
                {
                    dayOfWeek: String,
                    startTime: String,
                    endTime: String,
                    subject: String,
                },
            ],
        },
        type: {
            type: String,
            enum: ['lecture', 'lab', 'seminar', 'workshop'],
        },
        accessibilityFeatures: {
            type: [String],
        },
        building: {
            type: String,
            trim: true,
        },
        floor: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

const Classroom = mongoose.model('Classroom', ClassroomSchema);

module.exports = Classroom;
