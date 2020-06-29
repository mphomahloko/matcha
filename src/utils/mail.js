'use strict'
import mailer from "nodemailer";
import 'dotenv/config'

export const mail = async (account,subject, message) => {

    let transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MATCHA_EMAIL,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: process.env.MATCHA_EMAIL,
        to: account.email,
        subject: subject,
        html: message
    });

    console.log("Message sent: %s", info.messageId);
}

