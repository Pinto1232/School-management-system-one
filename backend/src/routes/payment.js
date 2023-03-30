const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');

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
