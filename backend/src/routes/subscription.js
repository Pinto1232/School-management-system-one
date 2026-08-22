const express = require('express');
const router = express.Router();
const {
    getAllSubscriptions,
    getSubscriptionById,
    createSubscriptionWithPayment,
    updateSubscription,
    deleteSubscription,
} = require('../controllers/subscription');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');

router.use(authenticate);
router.use(authorize(['admin']));

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
