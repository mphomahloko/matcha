import express from 'express';
import db from '../../config/database/database';
import passEncrypt from 'bcryptjs';

const router = express.Router();

// /register routes
router.get('/', (req, res)=>{
    res.render('pages/register', {username: "", email: "", name: "", password: "", passwordConf: ""});
});

router.post('/', (req, res)=>{

    let user = req.body.username;
    let pass = req.body.password;
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let confPass = req.body.passwordConf;

    if (user && pass && email && confPass)
    {
        let validPassPattern = /(?=^.{8,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
        let validEmailPattern = /[\w-]+@([\w-]+\.)+[\w-]+/;
        let validNamePattern = /(?=^.{2,50}$)(?=.*[a-z]).*$/;

        let validate_user = user.match(validNamePattern);
        let validate_pass = pass.match(validPassPattern);
        let validate_email = email.match(validEmailPattern);
        // let validate_firstName = firstName.match(validNamePattern);
        // let validate_lastName = lastName.match(validNamePattern);
        let validate_passConf = confPass.match(validPassPattern);

        if (!validate_user || !validate_email || !validate_pass || !validate_passConf)
        {
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
        }

        else
        {   
            passEncrypt.hash(pass, 8, (err, hashedPass) => {
                if (err)
                {
                    return err;
                }
                // console.log(hashedPass);
                db.query('INSERT INTO matcha_users (password, username, email, active) VALUES (?, ?, ?, ?)', [hashedPass, user, email, 0], (err, results, field) => {
                    if (results)
                    {
                        console.log("succesfully inserted pass, uname and email into the database!");
                    }
                    else{
                        console.log(err);
                    }
                });
            });
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
        }
    }

    else
    {
        if (req.body.username == "")
        {
            console.log("please insert username");
            res.render('pages/register',{ username: "empty", email: req.body.email, name: req.body.name, password: "not empty", passwordConf: "not empty"});
            res.end();
        }

        else if (req.body.email == "")
        {
            console.log("please insert email");
            res.render('pages/register', {username: req.body.username, email: "empty", name: req.body.name, password: "not empty", passwordConf: "not empty"});
            res.end();
        }

        else if (req.body.name == "")
        {
            console.log("please insert your name");
            res.render('pages/register', {username: req.body.username, email: req.body.email, name: "empty", password: "not empty", passwordConf: "not empty"});
            res.end();
        }

        else if (req.body.password == "")
        {
            console.log("you must enter a password");
            res.render('pages/register', {username: req.body.username, email: req.body.email, name: req.body.name, password: "empty", passwordConf: "not empty"});
            res.end();
        }

        if (req.body.passwordConf == "")
        {
            console.log("please fill in the password confirm field");
            res.render('pages/register', {username: req.body.username, email: req.body.email, name: req.body.name, password: "not empty", passwordConf: "empty"});
        }
    }
});

module.exports = router;
