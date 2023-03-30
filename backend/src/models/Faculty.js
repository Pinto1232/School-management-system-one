const mongoose = require('mongoose');
const Student = require('../models/Student');
const Finance = require('../models/Finance');

const FacultySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    department: {
        type: String,
        required: true,
        trim: true,
    },
    hireDate: {
        type: Date,
        required: true,
    },
    position: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
        },
    ],
    financeRecords: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Finance',
        },
    ],
    // You can add more fields here as needed
}, {
    timestamps: true,
});

module.exports = mongoose.model('Faculty', FacultySchema);
