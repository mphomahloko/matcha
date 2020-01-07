import express from 'express';
import db from '../../config/database/database';

const router = express.Router();

// /register routes
router.get('/', (req, res)=>{
    res.render('pages/register');
});

router.post('/', (req, res)=>{

    let user = req.body.username;
    let pass = req.body.password;
    let email = req.body.email;
    if (user && pass && email)
    {
        let validUserPattern = /(?=^.{2,50}$)(?=.*[a-z])(?=.*[A-Z]).*$/;
        let validPassPattern = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
        let validEmailPattern = /[\w-]+@([\w-]+\.)+[\w-]+/;

        let validate_user = user.match(validUserPattern);
        let validate_pass = pass.match(validPassPattern);
        let validate_email = email.match(validEmailPattern);

        if (!validate_user || !validate_email || !validate_pass)
        {
            if (!validate_user)
            {
                console.log("your username need to be 2 - 50 characters long and contain atleast lower and uppercase alphabets");
            }

            if (!validate_email)
            {
                console.log("your email needs to be in this format: user@mail.domain");
            }

            if (!validate_pass)
            {
                console.log("a password must contain lower and upper case characters, digit(s), and special character(s)");
            }
        }

        else
        {
            db.query('INSERT INTO matcha_users (username, password, email) VALUES (?,?,?)', [user, pass, email], (err, results) => {
                if (results.affectedRows)
                {
                    console.log("user info succesfully inserted into database");
                }
                else if (err)
                {
                    console.log("failed to insert to database");
                }
            });
        }
    }
    else
    {
        console.log("all fields need to be filled in");
    }
    res.send(pass);
});

module.exports = router;
