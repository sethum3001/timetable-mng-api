const emailService = require('../service/emailService');
const User = require('../models/Users');

// Function to send email notifications to students
async function sendEmails(timetableChanges) {
    try {
      const studentEmails = await User.find({}).select('email');
        // Send email notifications using the email service
        await emailService.sendEmail(timetableChanges, studentEmails);
    } catch (error) {
        console.error("Error sending email notifications:", error);
        throw error;
    }
}

module.exports = {
  sendEmails
};