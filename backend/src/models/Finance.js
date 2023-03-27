const mongoose = require('mongoose');

const FinanceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            trim: true,
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        faculty: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Faculty',
        },
        paymentMethod: {
            type: String,
            required: true,
            trim: true,
        },
        invoiceNumber: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'paid', 'overdue'],
            required: true,
        },
        // You can add more fields here as needed
    },
    {
        timestamps: true,
    }
);

const Finance = mongoose.model('Finance', FinanceSchema);

module.exports = Finance;
