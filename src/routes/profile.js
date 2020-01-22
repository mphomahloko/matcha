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
        if (req.body.username) {
            db.query('UPDATE matcha_users SET username = ?', [req.body.username], (err, results) => {
                if (err) throw err;
                else
                {
                    console.log("succesfully updated username");
                }
            })
        }
        if (req.body.email)
        {
            db.query('UPDATE matcha_users SET email = ?', [req.body.email], (err, results) => {
                if (err) throw err;
                else {
                    console.log("succesfully updated email");
                }
            })
        }
        if (req.body.firstname)
        {
            db.query('UPDATE matcha_users SET firstname = ?', [req.body.firstname], (err, results) => {
                if (err) throw err;
                else {
                    console.log("succesfully updated firstname");
                }
            })
        }
        if (req.body.lastname)
        {
            db.query('UPDATE matcha_users SET lastname = ?', [req.body.lastname], (err, results) => {
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
                db.query('UPDATE matcha_users SET password = ?', [hashedPass], (err, results) => {
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
    }
});

module.exports = router;
