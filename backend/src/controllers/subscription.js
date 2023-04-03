const Subscription = require('../models/Subscription');
const PayPalClient = require('../config/paymentGatewayConfig');

// Create a new subscription
exports.createSubscriptionWithPayment = async (req, res) => {
    try {
        // 1. Create the new subscription object in your database
        const newSubscription = new Subscription(req.body);
        await newSubscription.save();

        // 2. Create the PayPal payment order
        const request = new PayPalClient.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: newSubscription.currency,
                        value: newSubscription.paymentAmount,
                    },
                    description: 'Subscription payment',
                },
            ],
            application_context: {
                return_url: 'https://example.com/success', // Replace with your success URL
                cancel_url: 'https://example.com/cancel', // Replace with your cancel URL
            },
        });

        // 3. Call PayPal to create the order
        const response = await PayPalClient.client().execute(request);

        // 4. Save the PayPal order ID to the subscription in your database
        newSubscription.paypalOrderId = response.result.id;
        await newSubscription.save();

        // 5. Get the approval link from the PayPal order
        const approvalLink = response.result.links.find(link => link.rel === 'approve').href;

        // 6. Send the approval link to the client
        res.status(201).json({ success: true, data: newSubscription, approvalLink });
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
