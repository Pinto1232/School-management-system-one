const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');
const { SCHOOL_MANAGEMENT } = require('../security/roles');

router.use(authenticate);
router.use(authorize(SCHOOL_MANAGEMENT));

router
  .route('/')
  .get(paymentController.getAllPayments)
  .post(paymentController.createPayment);

router
  .route('/:id')
  .get(paymentController.getPaymentById) // Update the function name here
  .patch(paymentController.updatePayment)
  .delete(paymentController.deletePayment);

module.exports = router;
