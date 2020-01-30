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
        res.render('pages/register', {username: "", email: "", firstname: "", lastname: "", password: "", confirmpassword: ""});
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
        validators.validateName(firstName) && validators.validateName(lastName)) {
 
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
                                        console.log(results);
                                        console.log("succesfully inserted pass, uname and email into the database!");
                                    }
                                    else{
                                        console.log(err);
                                    }
                                });
                            } else {
                              console.log("email exists ");  
                            }
                        });      
                    } else {
                        console.log("user exists");
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

            res.render('pages/login', {username: req.body.username});

            // req.render('pages/', "welcome" + user);

            // db.query('SELECT username FROM matcha_users WHERE username = ?', [user], (err, results, fields) => {

            //     results.forEach(element => {
            //         let existingUserName = element.username;
            //         if (user === existingUserName)
            //         {
                        
            //             console.log("that username already exists");
            //             // res.send("that username already exists");
            //             // res.end();
            //         }
            //     });
            // });

            // db.query('SELECT email FROM matcha_users WHERE email = ?', [email], (err, results, fields) => {
            //     results.forEach(element => {
            //         let existingUserEmail = element.email;
            //         if (email === existingUserEmail)
            //         {
            //             console.log("that email matches that of an existing user");
            //             // res.send("that email matches that of an existing user");
            //             // res.end();
            //         }
            //     });
            // });

            
            // db.query('INSERT INTO matcha_users (username, password, email, name) VALUES (?,?,?,?)', [user, pass, email, name], (err, results) => {
            //     if (results.affectedRows)
            //     {
            //         console.log("user info succesfully inserted into database");
            //         res.send("user info successfully inserted into database");
            //     }
            //     else if (err)
            //     {
            //         console.log("failed to insert into database");
            //         res.send("failed to insert into database");
            //     }
            // });
            // console.log(existingUser)
    } else if (!validators.validateUsername(user) || !validators.validatePassword(pass) ||
                !validators.validateEmail(email) || !validators.validateConfPassword(pass, confPass) ||
                !validators.validateName(firstName) || !validators.validateName(lastName)) {


                    // considering how this should be changed!!!
                    
            if (!validate_user)
            {
                console.log("your username need to be 2 - 50 characters long and contain atleast one lower case alphabet");
                res.send("your username need to be 2 - 50 characters long and contain atleast one lower case alphabet");
                res.end();
            }

            else if (!validate_email)
            {
                console.log("your email needs to be in this format: user@mail.domain");
                res.send("your email needs to be in this format: user@mail.domain");
                res.end();
            }

            else if (!validate_pass)
            {
                console.log("a password must contain lower and upper case characters, digit(s), and special character(s)");
                res.send("a password must contain lower and upper case characters, digit(s), and special character(s)");
                res.end();
            }

            else if (!validate_passConf)
            {
                console.log("your confirm password must match your password above");
                res.render('pages/register', {username: req.body.username, email: req.body.email, name: req.body.name, password: "not empty", passwordConf: "match"});
                res.end();
            }
        } else {
        if (req.body.username == "")
        {
            console.log("please insert username");
            res.render('pages/register',{ username: "empty", email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, password: "not empty", confirmpassword: "not empty"});
            res.end();
        }

        else if (req.body.email == "")
        {
            console.log("please insert email");
            res.render('pages/register', {username: req.body.username, email: "empty", firstname: req.body.firstname, lastname: req.body.lastname, password: "not empty", confirmpassword: "not empty"});
            res.end();
        }

        else if (req.body.firstname == "")
        {
            console.log("please insert your firstname");
            res.render('pages/register', {username: req.body.username, email: req.body.email, firstname: "empty", lastname: req.body.lastname, password: "not empty", confirmpassword: "not empty"});
            res.end();
        }

        else if (req.body.lastname == "")
        {
            console.log("please insert your lastname");
            res.render('pages/register', {username: req.body.username, email: req.body.email, firstname: req.body.firstname, lastname: "empty", password: "not empty", confirmpassword: "not empty"});
            res.end();
        }

        else if (req.body.password == "")
        {
            console.log("you must enter a password");
            res.render('pages/register', {username: req.body.username, email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, password: "empty", confirmpassword: "not empty"});
            res.end();
        }

        else if (req.body.confirmpassword == "")
        {
            console.log("please fill in the password confirm field");
            res.render('pages/register', {username: req.body.username, email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, password: "not empty", confirmpassword: "empty"});
        }
    }
});

module.exports = router;
