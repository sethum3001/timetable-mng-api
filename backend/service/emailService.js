const nodemailer = require('nodemailer');
const email_template = require('./email_template.js');
const dotenv = require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function sendEmail() {
    try {
        // Send email
        const info = await transporter.sendMail({
            from: '<kungfupanda3001@gmail.com>',
            to: 'sethumrashmika3001@gmail.com',
            subject: 'Testing email',
            html: email_template
        });
        console.log("Message sent: " + info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

module.exports = {
    sendEmail: sendEmail
};

