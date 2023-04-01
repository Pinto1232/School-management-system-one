const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription');

router
    .route('/subscriptions')
    .get(subscriptionController.getAllSubscriptions)
    .post(subscriptionController.createSubscription);

router
    .route('/subscriptions/:id')
    .get(subscriptionController.getSubscriptionById)
    .put(subscriptionController.updateSubscription)
    .delete(subscriptionController.deleteSubscription);

module.exports = router;
