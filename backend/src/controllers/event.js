const Event = require('../models/Event');

// Helper function to handle validation and error messages
const validateEventData = (title, description, location, date, startTime, endTime, organizer, eventType, capacity, imageURL) => {
    const errors = [];
    if (!title) errors.push('Title is required');
    if (!description) errors.push('Description is required');
    if (!location) errors.push('Location is required');
    if (!date) errors.push('Date is required');
    if (!startTime) errors.push('Start time is required');
    if (!endTime) errors.push('End time is required');
    if (!organizer) errors.push('Organizer is required');
    if (!eventType) errors.push('Event type is required');
    if (!capacity) errors.push('Capacity is required');
    if (!imageURL) errors.push('Image URL is required');

    return errors;
};

// Create a new event
const createEvent = async (req, res) => {
    try {
        const { title, description, location, date, startTime, endTime, organizer, eventType, capacity, imageURL } = req.body;

        const errors = validateEventData(title, description, location, date, startTime, endTime, organizer, eventType, capacity, imageURL);
        if (errors.length > 0) return res.status(400).json({ errors });

        const newEvent = new Event({ title, description, location, date, startTime, endTime, organizer, eventType, capacity, imageURL });
        await newEvent.save();

        res.status(201).json({ message: 'Event created', event: newEvent });
    } catch (error) {
        res.status(400).json({ message: 'Error creating event', error });
    }
};

// Get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('organizer attendees');
        res.status(200).json({ events });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching events', error });
    }
};

// Get an event by ID
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id).populate('organizer attendees');

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ event });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching event', error });
    }
};

// Update an event
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, location, date, startTime, endTime, organizer, eventType, capacity, imageURL } = req.body;

        const errors = validateEventData(title, description, location, date, startTime, endTime, organizer, eventType, capacity, imageURL);
        if (errors.length > 0) return res.status(400).json({ errors });

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { title, description, location, date, startTime, endTime, organizer, eventType, capacity, imageURL },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Event updated', event: updatedEvent });
    } catch (error) {
        res.status(400).json({ message: 'Error updating event', error });
    }
};

// Delete an event
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await Event.findByIdAndDelete(id);

        res.status(200).json({ message: 'Event deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting event', error });
    }
};

// Export the controller methods
module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
};

