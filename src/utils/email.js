import nodemailer from 'nodemailer';
import db from '../../config/database/database';
require('dotenv').config();

export async function sendEmail(user, receiver, token) {
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
        html: `<p>Congradulations, you have started on the right journey to find your true love with online dating</p>
               <p>Please click on this <a href="http://localhost:4000/login?user=${user}&token=${token}">link</a>
               to activate your account</p>`
    };
    
    await transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.log(err);
            db.query('DELETE FROM matcha_users WHERE email=?', [receiver], (erRor) => {
            if (erRor) {
                throw new Error(erRor)
            } else {
                throw new Error('user info has been removed from database');
            }
        });
        } else {
            console.log(`Email sent to:  + ${receiver}`);
        }
    });
};