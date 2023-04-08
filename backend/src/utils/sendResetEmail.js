const sendEmail = require('./sendEmail');

const sendResetEmail = async (userEmail, resetUrl) => {
  const message = `You have requested a password reset. Please click the following link to reset your password: ${resetUrl}`;
  await sendEmail({
    email: userEmail,
    subject: 'Password Reset Request',
    message,
  });
};

module.exports = sendResetEmail;
