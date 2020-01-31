import express from 'express';
import db from '../../config/database/database';
import passEncrypt from 'bcryptjs';
import validators from '../models/validators';
import nodeMailer from 'nodemailer';
import { realpath } from 'fs';

const router = express.Router();

// /register routes
router.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render('pages/home', {username: req.session.username});
    } else {
        res.render('pages/register', {success: true, message: "Complete form to register"});
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

    if (validators.validateUsername(user) && validators.validatePassword(pass) &&
        validators.validateEmail(email) && validators.validateConfPassword(pass, confPass) &&
        validators.validateLastName(firstName) && validators.validateFirstName(lastName)) {
 
            passEncrypt.hash(pass, 8, (err, hashedPass) => {
                if (err) {
                    return err;
                }
                db.query('SELECT username FROM matcha_users WHERE username=?', // unique username
                [user], (err, results, field) => {
                    if (err) return err;

                    if (results.length == 0) {
                        db.query('SELECT email FROM matcha_users WHERE email=?', // unique email
                        [email], (err, results, field) => {
                            if (err) return err;
                            if (results.length == 0) {
                                // ready for insert statement
                                db.query('INSERT INTO matcha_users (password, username, email, active, firstname, lastname) VALUES (?, ?, ?, ?, ?, ?)', [hashedPass, user, email, 0, firstName, lastName], (err, results, field) => {
                                    if (results) {
                                        res.status(200).render('pages/login', {success: true, message: "succesfully registerd, please click on the link in your email to activate your account"});
                                        res.end();
                                    }
                                    else {
                                        res.status(401).render('pages/register', {success: false, message: "failed to register you for some reason. please try registering again"});
                                        res.end();
                                        console.log(err);
                                    }
                                });
                            } else {
                                res.status(401).render('pages/register', {success: false, message: "email already exists"});
                            }
                        });      
                    } else {
                        res.status(401).render('pages/register', {success: false, message: "user already exists"});
                    }
                });
            });

            // a fake account that is going to be used to send emails
            // nodeMailer.createTestAccount((err, Acount) => {
            //     if (!err) {
            //         console.log(Acount);
            //         let transporter = nodeMailer.createTransport({
            //             host: Acount.smtp.host,
            //             port: Acount.smtp.port,
            //             secure: Acount.smtp.secure,
            //             auth: {
            //                 user: Acount.user,
            //                 pass: Acount.pass
            //             }
            //         });
            //     }
            // });


            // for now let's just operate under the assumption that i'm still all over the place here.

            function sendEmail(name, verificationcode, email) {
                var text = "Welcome to matcha , we are here to help you connect with your soul mate, please click on the link to activate your account http://localhost:3600/activate?name="+name+","+ verificationcode;
                transporter = nodemailer.createTransport({
                    service: 'something like gmail',
                    auth: {
                        user: 'sender email',
                        pass: 'sender pass'
                    }
                });
                mailOptions = {
                    from: '"Matcha" <sender email>',
                    to: email,
                    subject: 'Matcha registration',
                    text: text,
                    html: '<a>'+text+'</a>'
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });
             }

            // res.render('pages/index');

    } else {
            if (!validators.validateUsername(user))
            {
                res.status(401).render('pages/register',{success: false, message: "your username need to be 2 - 50 characters long and contain atleast one lower case alphabet"});
                res.end();
            }
            else if (!validators.validateEmail(email))
            {
                res.status(401).render('pages/register', {success: false, message: "your email needs to be in this format: user@mail.domain"});
                res.end();
            }
            else if (!validators.validatePassword(pass))
            {
                console.log("a password must contain lower and upper case characters, digit(s), and special character(s)");
                res.status(401).render('pages/register', {success: false, message: "a password must contain lower and upper case characters, digit(s), and special character(s)"});
                res.end();
            }
            else if (!validators.validateConfPassword(pass, confPass))
            {
                res.status(401).render('pages/register', {success: false, message: "your confirm password must match your password"});
                res.end();
            }
        }
});

module.exports = router;
