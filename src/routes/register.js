import express from 'express';
import db from '../../config/database/database';
import passEncrypt from 'bcryptjs';
import validators from '../utils/validators';
import { regToken } from '../utils/registrationToken';
import nodemailer from 'nodemailer';
require('dotenv').config();

const router = express.Router();

// /register routes
router.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render('pages/home', {
            username: req.session.username
        });
    } else {
        res.render('pages/register', {
            success: true,
            message: 'Complete form to register'
        });
    }
    res.end();
});

router.post('/', (req, res) => {

    let user = req.body.username;
    let pass = req.body.password;
    let email = req.body.email;
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let confPass = req.body.confirmpassword;

    if (validators.validateUsername(user) && validators.validatePass(pass) &&
        validators.validateEmail(email) && validators.validateConfPass(pass, confPass) &&
        validators.validateLastName(lastName) && validators.validateFirstName(firstName)) {

        passEncrypt.hash(pass, 8, (err, hashedPass) => {
            if (err) {
                return err;
            }
            db.query('SELECT username FROM matcha_users WHERE username=?', // unique username
                [user], (err, results) => {
                    if (err) return err;

                    if (results.length == 0) {
                        db.query('SELECT email FROM matcha_users WHERE email=?', // unique email
                            [email],
                            (err, results) => {
                            if (err) return err;
                            if (results.length == 0) {
                                // ready for insert statement
                                let token = regToken(20);
                                db.query('INSERT INTO matcha_users (password, username, email, active, firstname, lastname, token) VALUES (?, ?, ?, ?, ?, ?, ?)',
                                    [hashedPass, user, email, 0, firstName, lastName, token],
                                    async (err, results) => {
                                    if (results) {
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
                                            to: email,
                                            subject: 'Welcome to Matcha',
                                            html: `<p>Congradulations, you have started on the right journey to find your true love with online dating</p>
                                                   <p>Please click on this <a href="http://localhost:4000/login?user=${user}&token=${token}">link</a>
                                                   to activate your account</p>`
                                        };
                                        
                                        transporter.sendMail(mailOptions, (err) => {
                                            if (err) {
                                                res.status(401).render('pages/register', {
                                                    success: false,
                                                    message: 'failed to register you for some reason. please try registering again'
                                                });
                                                res.end();
                                                console.log(err);
                                                db.query('DELETE FROM matcha_users WHERE email=?', [email], (erRor) => {
                                                if (erRor) {
                                                    console.log("failed to remove user from database");
                                                } else {
                                                    console.log("user removed from database");
                                                }
                                            });
                                            } else {
                                                console.log(`Email sent to: ${email}`);
                                                res.status(200).render('pages/login', {
                                                    success: true,
                                                    message: 'successfully registered, please click on the link in your email to activate your account.'
                                                });
                                                res.end();
                                            }
                                        });
                                    } else {
                                        res.status(401).render('pages/register', {
                                            success: false,
                                            message: 'failed to register you for some reason. please try registering again'
                                        });
                                        res.end();
                                        console.log(err);
                                    }
                                });
                            } else {
                                res.status(401).render('pages/register', {
                                    success: false,
                                    message: 'email already exists'
                                });
                            }
                        });
                    } else {
                        res.status(401).render('pages/register', {
                            success: false,
                            message: 'user already exists'
                        });
                    }
                });
        });
    } else {
        if (!validators.validateUsername(user)) {
            res.status(401).render('pages/register', {
                success: false,
                message: 'your username need to be 2 - 50 characters long and contain at least one lower case alphabet'
            });
            res.end();
        } else if (!validators.validateEmail(email)) {
            res.status(401).render('pages/register', {
                success: false,
                message: 'your email needs to be in this format: user@mail.domain'
            });
            res.end();
        } else if (!validators.validatePass(pass)) {
            console.log('a password must contain lower and upper case characters, digit(s), and special character(s)');
            res.status(401).render('pages/register', {
                success: false,
                message: 'a password must contain lower and upper case characters, digit(s), and special character(s)'
            });
            res.end();
        } else if (!validators.validateConfPass(pass, confPass)) {
            res.status(401).render('pages/register', {
                success: false,
                message: 'your confirm password must match your password'
            });
            res.end();
        }
    }
});

module.exports = router;
