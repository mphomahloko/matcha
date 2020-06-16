import express from 'express';
import db from '../../config/database/database';
import passEncrypt from 'bcryptjs';
import validators from '../models/validators';
import { sendEmail } from '../functions/email';
import { regToken } from '../functions/registrationToken';

const router = express.Router();

// /register routes
router.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render('pages/home', { username: req.session.username });
    } else {
        res.render('pages/register', { success: true, message: "Complete form to register" });
    }
    res.end();
});

router.post('/',  (req, res) => {

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
            // just so it will allow me to recycle one user during testing
            // db.query('DELETE FROM matcha_users WHERE email=?', [email], (erRor, reSults) => {if (erRor) console.log(erRor); else console.log("success")});
            db.query('SELECT username FROM matcha_users WHERE username=?', // unique username
                [user], (err, results, field) => {
                    if (err) return err;

                    if (results.length == 0) {
                        db.query('SELECT email FROM matcha_users WHERE email=?', // unique email
                            [email], (err, results, field) => {
                                if (err) return err;
                                if (results.length == 0) {
                                    // ready for insert statement
                                    let token = regToken(20);
                                    db.query('INSERT INTO matcha_users (password, username, email, active, firstname, lastname, token) VALUES (?, ?, ?, ?, ?, ?, ?)',
                                        [hashedPass, user, email, 0, firstName, lastName, token],
                                        async (err, results, field) => {
                                        if (results) {

                                            sendEmail(user, email, token);
                                            res.status(200).render('pages/login', {
                                                success: true,
                                                message: "successfully registered, please click on the link in your email to activate your account"
                                            });
                                            res.end();
                                        }
                                        else {
                                            res.status(401).render('pages/register', {
                                                success: false,
                                                message: "failed to register you for some reason. please try registering again"
                                            });
                                            res.end();
                                            console.log(err);
                                        }
                                    });
                                } else {
                                    res.status(401).render('pages/register', { success: false, message: "email already exists" });
                                }
                            });
                    } else {
                        res.status(401).render('pages/register', { success: false, message: "user already exists" });
                    }
                });
        });
    } else {
        if (!validators.validateUsername(user)) {
            res.status(401).render('pages/register', {
                success: false,
                message: "your username need to be 2 - 50 characters long and contain at least one lower case alphabet"
            });
            res.end();
        }
        else if (!validators.validateEmail(email)) {
            res.status(401).render('pages/register', {
                success: false, message:
                    "your email needs to be in this format: user@mail.domain"
            });
            res.end();
        }
        else if (!validators.validatePass(pass)) {
            console.log("a password must contain lower and upper case characters, digit(s), and special character(s)");
            res.status(401).render('pages/register', {
                success: false,
                message: "a password must contain lower and upper case characters, digit(s), and special character(s)"
            });
            res.end();
        }
        else if (!validators.validateConfPassword(pass, confPass)) {
            res.status(401).render('pages/register', {
                success: false,
                message: "your confirm password must match your password"
            });
            res.end();
        }
    }
});

module.exports = router;
