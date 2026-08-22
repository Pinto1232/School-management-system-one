const nodemailer = require('nodemailer');
const { smtp } = require('../config/env');

const sendEmail = async (options) => {
    if (!smtp.host || !smtp.user || !smtp.password || !smtp.from) {
        const error = new Error('SMTP is not configured.');
        error.code = 'SMTP_NOT_CONFIGURED';
        throw error;
    }

    const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure,
        auth: {
            user: smtp.user,
            pass: smtp.password,
        },
    });

    await transporter.sendMail({
        from: smtp.from,
        to: options.email,
        subject: options.subject,
        text: options.message,
    });
};

module.exports = sendEmail;
