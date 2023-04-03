// Stripe payment gateway connection 

/* const stripe = require('stripe')('your_stripe_api_key');
module.exports = stripe;
 */

// Paypal payment gateway connection 
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const paypal = require('@paypal/payouts-sdk');

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const environment = new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);
const client = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

module.exports = {
    client: () => client,
    orders: checkoutNodeJssdk.orders,
    payouts: paypal.payouts,
};
