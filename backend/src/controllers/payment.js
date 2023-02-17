const Payment = require('../models/Payment');

// @desc    Get all payments
// @route   GET /api/payments
// @access  Public
const getPayments = async (req, res) => {
    try {
        // Fetch all payments from the database
        const payments = await Payment.find();

        // Send success response with the payments data
        res.status(200).json({
            success: true,
            count: payments.length,
            data: payments
        });
    } catch (error) {
        // Send error response if there is a problem with fetching the payments data
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};

// @desc    Get single payment by ID
// @route   GET /api/payments/:id
// @access  Public
const getPaymentById = async (req, res) => {
    try {
        // Fetch a single payment by its ID from the database
        const payment = await Payment.findById(req.params.id);

        // Send success response with the payment data
        res.status(200).json({
            success: true,
            data: payment
        });
    } catch (error) {
        // Send error response if there is a problem with fetching the payment data
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Payment not found with ID: ${req.params.id}`
            });
        } else {
            // Handle general errors
            res.status(500).json({
                success: false,
                error: `Server error: ${error.message}`
            });
        }
    }
};

// @desc    Create new payment
// @route   POST /api/payments
// @access  Private
const createPayment = async (req, res) => {
    try {
        // Create a new payment based on the request body data
        const payment = await Payment.create(req.body);

        // Send success response with the created payment data
        res.status(201).json({
            success: true,
            data: payment
        });
    } catch (error) {
        // Send error response if there is a problem with creating the payment
        res.status(500).json({
            success: false,
            error: `Server error: ${error.message}`
        });
    }
};


// @desc    Update payment record by ID
// @route   PUT /api/payments/:id
// @access  Private
const updatePaymentRecord = async (req, res) => {
    try {
        // Find and update a payment record by its ID in the database
        const paymentRecord = await Payment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Send success response with the updated payment record data
        res.status(200).json({
            success: true,
            data: paymentRecord
        });
    } catch (error) {
        // Send error response if there is a problem with updating the payment record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Payment record not found with ID: ${req.params.id}`
            });
        } else {
            // Handle general errors
            res.status(500).json({
                success: false,
                error: `Server error: ${error.message}`
            });
        }
    }
};


// @desc    Delete payment record by ID
// @route   DELETE /api/payment/:id
// @access  Private
const deletePaymentRecord = async (req, res) => {
    try {
        // Find the payment record by ID and delete it from the database
        const paymentRecord = await Payment.findByIdAndDelete(req.params.id);

        // Send success response with the deleted payment record data
        res.status(200).json({
            success: true,
            data: paymentRecord
        });
    } catch (error) {
        // Send error response if there is a problem with deleting the payment record
        if (error.kind === 'ObjectId') {
            // Handle a specific error where the provided ID is not valid
            res.status(404).json({
                success: false,
                error: `Payment record not found with ID: ${req.params.id}`
            });
        } else {
            res.status(500).json({
                success: false,
                error: `Server error: ${error.message}`
            });
        }
    }
}



module.exports = {
    getPayments,
    getPaymentById,
    createPayment,
    updatePaymentRecord,
    deletePaymentRecord
}