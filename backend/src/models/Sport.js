const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    numberOfPlayers: {
        type: Number,
        required: true,
    },
    equipment: [
        {
            itemName: {
                type: String,
                required: true,
                trim: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    rules: [
        {
            rule: {
                type: String,
                required: true,
                trim: true,
            },
        },
    ],
    origin: {
        country: {
            type: String,
            required: true,
            trim: true,
        },
        year: {
            type: Number,
            required: true,
        },
    },
    playerImage: {
        type: String,
        required: true,
        trim: true,
    },
});

const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;
