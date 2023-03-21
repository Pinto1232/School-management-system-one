const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
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
    location: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    attendees: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student',
        },
    ],
    eventType: {
        type: String,
        enum: ['workshop', 'seminar', 'conference', 'meeting', 'social'],
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    // Add more fields if needed
},
{
    timestamps: true,
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
