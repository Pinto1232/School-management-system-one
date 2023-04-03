const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    subscriber: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'onModel',
        required: true,
    },
    onModel: {
        type: String,
        enum: ['User', 'Institution'],
        required: true,
    },
    subscriptionType: {
        type: String,
        enum: ['Free', 'basic', 'premium', 'enterprise'],
        required: true,
    },
    subscribedModules: [
        {
            moduleName: {
                type: String,
                required: true,
                trim: true,
            },
        },
    ],
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    autoRenew: {
        type: Boolean,
        default: true,
    },
    billingCycle: {
        type: String,
        enum: ['monthly', 'quarterly', 'yearly'],
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'pending', 'overdue'],
        required: true,
    },
    paymentAmount: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD', 'SEK', 'KRW', 'SGD', 'NOK', 'MXN', 'INR', 'RUB', 'ZAR', 'TRY', 'BRL', 'TWD', 'DKK', 'PLN', 'THB', 'IDR', 'HUF', 'CZK', 'ILS', 'CLP', 'PHP', 'AED', 'COP', 'SAR', 'MYR', 'RON', 'Kz'],
        default: 'USD',
    },    
    paymentDate: {
        type: Date,
        required: true,
    },
    nextBillingDate: {
        type: Date,
        required: true,
    },
    cancellationDate: {
        type: Date,
    },
    notes: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
module.exports = Subscription;
