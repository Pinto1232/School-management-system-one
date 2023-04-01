const Subscription = require('../models/Subscription');

// Create a new subscription
exports.createSubscription = async (req, res) => {
    try {
        const newSubscription = new Subscription(req.body);
        await newSubscription.save();
        res.status(201).json({ success: true, data: newSubscription });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all subscriptions
exports.getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get a subscription by ID
exports.getSubscriptionById = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update a subscription by ID
exports.updateSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a subscription by ID
exports.deleteSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findByIdAndRemove(req.params.id);
        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
