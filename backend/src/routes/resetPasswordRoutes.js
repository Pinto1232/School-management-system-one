// resetPasswordRoutes.js
const express = require('express');
const router = express.Router();
const { requestPasswordReset, validateResetToken, updatePassword } = require('../controllers/resetPassword');

router.post('/', requestPasswordReset);
router.post('/request-password-reset', requestPasswordReset);
router.get('/validate-reset-token/:token', validateResetToken);
router.post('/update-password', updatePassword);

module.exports = router;
