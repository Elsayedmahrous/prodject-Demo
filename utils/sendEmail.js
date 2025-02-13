const nodemailer = require('nodemailer');

const sendEmail = async(options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT, // if secure false port = 587, true = 465.
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
           pass: process.env.EMAIL_PASS,
        }
    })
    const mailOpts = {
        from: '',
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(mailOpts)
 };

module.exports = sendEmail;
