const transporter = require("../config/email");

exports.sendEmail = async ({ subject, text }) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "admin@example.com",
    subject,
    text,
  });
};
