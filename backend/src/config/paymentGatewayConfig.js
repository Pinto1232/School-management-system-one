// Stripe payment gateway connection 

/* const stripe = require('stripe')('your_stripe_api_key');
module.exports = stripe;
 */

// Paypal payment gateway connection 
const paypal = require('paypal-rest-sdk');
paypal.configure({
  mode: 'sandbox', // Change this to 'live' when you're ready to go live
  client_id: 'your_paypal_client_id',
  client_secret: 'your_paypal_client_secret',
});
module.exports = paypal;
