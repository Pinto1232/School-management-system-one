const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    basicPlan: {
        type: String,
        required: true
    },
    proPlan: {
        type: String,
        required: true
    },
    premiumPlan: {
        type: String,
        required: true
    },
    feature: {
        type: String,
        required: true
    },
    packageImage: {
        type: String,
        required: true
    }
});

const Package = mongoose.model('Package', packageSchema);
module.exports = Package;
