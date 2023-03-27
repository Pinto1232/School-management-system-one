const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financial');

router.route('/')
    .post(financeController.createFinance)
    .get(financeController.getAllFinances);

router.route('/:id')
    .get(financeController.getFinanceById)
    .put(financeController.updateFinance)
    .delete(financeController.deleteFinance);

module.exports = router;
