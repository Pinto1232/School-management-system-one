const mongoose = require('mongoose');

const StudentTrackingSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    attendance: {
        type: String,
        enum: ['present', 'absent', 'late'],
        required: true,
    },
    performance: {
        type: String,
        enum: ['excellent', 'good', 'average', 'poor'],
        required: true,
    },
    comments: {
        type: String,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const StudentTracking = mongoose.model('StudentTracking', StudentTrackingSchema);
module.exports = StudentTracking;
