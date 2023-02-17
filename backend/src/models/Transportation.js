const mongoose = require("mongoose");

const transportationSchema = new mongoose.Schema({
    vehicleID: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    route: {
        type: String,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    driverInformation: {
        type: String,
        required: true
    }
});

const Transportation = mongoose.model("Transportation", transportationSchema);

const createTransportation = async (vehicleID, vehicleNumber, vehicleType, capacity, route, schedule, driverInformation) => {
    const transportation = new Transportation({
        vehicleID,
        vehicleNumber,
        vehicleType,
        capacity,
        route,
        schedule,
        driverInformation
    });

    try {
        const result = await transportation.save();
        console.log(result);
    } catch (err) {
        console.error(err.message);
    }
};
module.exports = Transportation;

