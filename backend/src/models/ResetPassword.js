const mongoose = require('mongoose');
const crypto = require('crypto');

const resetPasswordSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
    required: true,
    unique: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
});

resetPasswordSchema.methods.generateResetToken = function (tokenLength = 32, expiryHours = 1) {
  this.resetToken = crypto.randomBytes(tokenLength).toString('hex');
  this.expiryDate = new Date(Date.now() + expiryHours * 60 * 60 * 1000);
};

const ResetPassword = mongoose.model('ResetPassword', resetPasswordSchema);
module.exports = ResetPassword;
