const nodemailer = require("nodemailer");

class Mail {
    static send(to, subject, html) {
        const transporter = nodemailer.createTransport(process.env.EMAIL_URL);
        transporter.sendMail({
            from: "insta",
            to: to,
            subject: subject,
            html: html,
        });
    }
}

module.exports = Mail;
