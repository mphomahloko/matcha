import nodemailer from 'nodemailer';
require('dotenv').config();

export function sendEmail(user, receiver, token) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MATCHA_EMAIL,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    let mailOptions = {
        from: process.env.MATCHA_EMAIL,
        to: receiver,
        subject: 'Welcome to Matcha',
        html: `<p>Congradulations, you have started on the right journey to find your true love with online dating</p><p>Please click on this <a href="http://localhost:4000/login?user=${user}&token=${token}">link</a> to activate your account</p>`
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent to: ' + receiver);
        }
    });
};