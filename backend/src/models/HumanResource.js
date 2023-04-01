const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const humanResourceSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    hireDate: {
        type: Date,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    performanceReviews: [
        {
            reviewDate: Date,
            reviewer: String,
            rating: Number,
            comments: String,
        },
    ],
    emergencyContact: {
        name: String,
        relationship: String,
        phoneNumber: String,
    },
    vacationDays: {
        totalDays2q12: Number,
        usedDays: Number,
        remainingDays: Number,
    },
    benefits: [String],
});

const HumanResource = mongoose.model('HumanResource', humanResourceSchema);

module.exports = HumanResource;
