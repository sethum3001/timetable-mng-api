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

async function sendEmail(timetableChanges, receivers) {
    try {
        // Create email content with timetable change details
        const emailContent = email_template
            .replace('[Date of Change]', timetableChanges.date)
            .replace('[New Time]', timetableChanges.time)
            .replace('[Course Name]', timetableChanges.course)
            .replace('[New Location]', timetableChanges.location);

        // Send email to each receiver
        const promises = receivers.map(async (receiver) => {
            const info = await transporter.sendMail({
                from: '<sethumrashmika3001@gmail.com>',
                to: receiver,
                subject: 'Timetable Change Notification',
                html: emailContent
            });
            console.log("Message sent to " + receiver + ": " + info.messageId);
            return info;
        });

        // Wait for all emails to be sent
        await Promise.all(promises);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

module.exports = {
    sendEmail: sendEmail
};

