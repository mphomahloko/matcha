import express from 'express';
import db from '../../config/database/database';
import passEncrypt from 'bcryptjs';

const router = express.Router();

// /profile routes

router.get('/', (req, res)=>{
    // get loggedin user from database
    if (req.session.loggedin) {
        let user = req.session.username;

        db.query('SELECT * from matcha_users WHERE username=?', [user], (err, results)=>{
            if (err) throw err;
            results.forEach(element => {
                res.render('pages/profile', element);
            });
            res.end();
        });
    } else {
        res.render('pages/login');
        res.end();
    }
});

router.post('/', (req, res)=>{
    if (req.session.loggedin)
    {
        let user = req.session.username;

        // NB!! when you update the username. it will give you some problems because the user that is in session is the one with the previous username.
        // especially when trying to work with the profile page
        // since you are now using a different username, it struggles to match your username in the database with that in session.


        if (req.body.username) {
            db.query('UPDATE matcha_users SET username = ? WHERE username = ?', [req.body.username, user], (err, results) => {
                if (err) throw err;
                else {
                    req.session.username = req.body.username;
                    console.log("succesfully updated username");
                }
            })
        }
        if (req.body.email)
        {
            db.query('UPDATE matcha_users SET email = ? WHERE username = ?', [req.body.email, user], (err, results) => {
                if (err) throw err;
                else {
                    console.log(results);
                    console.log("succesfully updated email");
                }
            })
        }
        if (req.body.firstname)
        {
            db.query('UPDATE matcha_users SET firstname = ? WHERE username = ?', [req.body.firstname, user], (err, results) => {
                if (err) throw err;
                else {
                    console.log("succesfully updated firstname");
                }
            })
        }
        if (req.body.lastname)
        {
            db.query('UPDATE matcha_users SET lastname = ? WHERE username = ?', [req.body.lastname, user], (err, results) => {
                if (err) throw err;
                else {
                    console.log("succesfully updated lastname");
                }
            })
        }
        if (req.body.password)
        {
            passEncrypt.hash(req.body.password, 8, (error, hashedPass) => {
                if (error) throw err;
                db.query('UPDATE matcha_users SET password = ? WHERE username = ?', [hashedPass, user], (err, results) => {
                    if (err) throw err;
                    else {
                        console.log("succesfully updated password");
                    }
                })
            })
            
        }
        if (req.body.gender)
        {
            db.query('UPDATE matcha_users SET gender = ?', [req.body.gender], (err, results) => {
                if (err) throw err;
                else {
                    console.log("succesfully updated gender")
                }
            })
        }
        if (req.body.sexualPreference)
        {
            db.query('UPDATE matcha_users SET sexualPreference = ?', [req.body.sexualPreference], (err, results) => {
                if (err) throw err;
                else {
                    console.log("succesfully updated sexualPreference")
                }
            })
        }
        if (req.body.bibliography)
        {
            db.query('UPDATE matcha_user SET bibliography = ?', [req.body.bibliography], (err, results) => {
                if (err) throw err;
            })
        }
        res.render('pages/home', {username: req.body.username});
    }
});

module.exports = router;
