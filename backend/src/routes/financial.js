const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financial');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');
const { SCHOOL_MANAGEMENT } = require('../security/roles');

router.use(authenticate);
router.use(authorize(SCHOOL_MANAGEMENT));

router.route('/')
    .post(financeController.createFinance)
    .get(financeController.getAllFinances);

router.route('/:id')
    .get(financeController.getFinanceById)
    .put(financeController.updateFinance)
    .delete(financeController.deleteFinance);

module.exports = router;
