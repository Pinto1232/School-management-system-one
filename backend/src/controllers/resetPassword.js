// controller/resetPassword.js
const User = require('../models/User');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const ResetPassword = require('../models/ResetPassword');
const sendResetEmail = require('../utils/sendResetEmail'); // Make sure this import statement is correct


const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetPassword = new ResetPassword({
            userEmail: user.email,
            resetToken: resetToken,
            expiryDate: Date.now() + 3600000,
        });

        await resetPassword.save();

        // Send an email with the reset link
        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
        await sendResetEmail(user.email, resetUrl);

        res.status(200).json({ message: 'Password reset link sent to your email address' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};

// Validate token
const validateResetToken = async (req, res) => {
    console.log('Validating reset token');
    const resetToken = req.params.token;

    try {
        const resetPassword = await ResetPassword.findOne({ resetToken });

        if (!resetPassword || resetPassword.expiryDate < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        res.status(200).json({ message: 'Valid reset token', userEmail: resetPassword.userEmail });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};

const updatePassword = async (req, res) => {
    const userEmail = req.body.userEmail;
    const newPassword = req.body.password;

    try {
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};


module.exports = {
    requestPasswordReset,
    validateResetToken,
    updatePassword,
};
