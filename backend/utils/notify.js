// services/notificationService.js
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const path = require("path");
const fs = require("fs");
// Create a mail transporter for sending email notifications via SMTP
const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../config/notifications.json"))
);
const mailTo = config.mailto;

const transporter = nodemailer.createTransport({
  host: "mail.cityparking.co.zw", // SMTP server (e.g., smtp.office365.com, smtp.gmail.com, your mail server)
  port: 465, // Common SMTP ports: 587 (TLS), 465 (SSL)
  secure: "true", // true for 465, false for 587
  auth: {
    user: "notifications@cityparking.co.zw", // Your email username
    pass: "@Pass2024", // Your email password
  },
});

// Send Email Notification
async function sendEmailNotification(log) {
  if (!mailTo) {
    console.warn("No notification email configured.");
    return;
  }
  const mailOptions = {
    from: `"Logger Service" notifications@cityparking.co.zw`,
    to: mailTo, // make this configurable
    subject: `⚡ Event Log - ${log.event_type || "Unknown Event"}`,
    text: `An event occurred:\n\nType: ${log.event_type}\nLevel: ${
      log.log_level
    }\nMessage: ${log.message}\nTimestamp: ${new Date().toISOString()}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Notification email sent successfully.");
  } catch (error) {
    console.error("Error sending notification email:", error.message);
  }
}

// Send SMS Notification (optional - commented out)
async function sendSMSNotification(log) {
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

  try {
    await client.messages.create({
      body: `Event [${log.event_type}] - ${log.message}`,
      from: process.env.TWILIO_PHONE,
      to: process.env.NOTIFICATION_PHONE_TO,
    });
    console.log("Notification SMS sent successfully.");
  } catch (error) {
    console.error("Error sending notification SMS:", error.message);
  }
}

// Unified function to send notifications
async function sendNotification(log) {
  await sendEmailNotification(log);

  // Uncomment if you also want SMS notifications
  // await sendSMSNotification(log);
}

module.exports = { sendNotification };
