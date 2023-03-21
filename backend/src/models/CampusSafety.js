const mongoose = require('mongoose');

const CampusSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        size: {
            type: String,
            required: true,
            trim: true,
        },
        securityPhoneNumber: {
            type: String,
            required: true,
            trim: true,
        },
        securityEmail: {
            type: String,
            required: true,
            trim: true,
        },
        emergencyProcedures: {
            type: String,
            required: true,
            trim: true,
        },
        medicalFacility: {
            type: String,
            required: true,
            trim: true,
        },
        securityStaff: {
            type: [{
                name: String,
                title: String,
                contact: String,
            }],
            required: true,
        },
        safetyPolicies: {
            type: [{
                name: String,
                description: String,
            }],
            required: true,
        },
        // You can add more fields here as needed
    },
    {
        timestamps: true,
    }
);

const Campus = mongoose.model('Campus', CampusSchema);

module.exports = Campus;
