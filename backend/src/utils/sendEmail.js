const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Create a transporter using your email service credentials
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Replace 'your_email_service_host' with your email service provider's hostname
        port: 587, // Set the appropriate port for your email service provider
        secure: false,
        auth: {
            user: 'pintoydc@gmail.com',
            pass: 'rjl123', // Replace this with your new password
        },
    });

    try {
        const mailOptions = {
            from: 'pintoydc@gmail.com',
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
