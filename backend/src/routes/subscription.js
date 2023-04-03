const express = require('express');
const router = express.Router();
const {
    getAllSubscriptions,
    getSubscriptionById,
    createSubscriptionWithPayment,
    updateSubscription,
    deleteSubscription,
} = require('../controllers/subscription');

router
    .route('/')
    .get(getAllSubscriptions)
    .post(createSubscriptionWithPayment);

router
    .route('/:id')
    .get(getSubscriptionById)
    .put(updateSubscription)
    .delete(deleteSubscription);

module.exports = router;
