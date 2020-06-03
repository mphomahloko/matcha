 import express from 'express';
import db from '../../config/database/database';
import passEncrypt from 'bcryptjs';

const profileRoute = express.Router();

// /profile routes

 profileRoute.route('/')
   .get((req, res) => {
    // get loggedin user from database
    if (req.session.loggedin) {
        let user = req.session.username;
        db.query('SELECT * from matcha_users WHERE username=?', [user], (err, results) => {
            if (err) throw err;
            results.forEach(element => {
                res.status(200).render('pages/profile', element);
                res.end();
            });
        });
    } else {
        res.status(401).render('pages/login', {
            success: true,
            message: "have an account?... Enter your details to login"
        });
        res.end();
    }
   })
   .post((req, res) => {
    if (req.session.loggedin) {
        let user = req.session.username;
        if (req.body.username) {
            db.query('UPDATE matcha_users SET username = ? WHERE username = ?',
              [req.body.username, user],
              (err, results) => {
                if (err) throw err;
                else {
                    req.session.username = req.body.username;
                    console.log("succesfully updated username");
                }
            });
        }
        if (req.body.email) {
            db.query('UPDATE matcha_users SET email = ? WHERE username = ?',
              [req.body.email, user],
              (err, results) => {
                if (err) throw err;
                else {
                    console.log("succesfully updated email");
                }
            });
        }
        if (req.body.firstname) {
            db.query('UPDATE matcha_users SET firstname = ? WHERE username = ?',
              [req.body.firstname, user],
              (err, results) => {
                if (err) throw err;
                else {
                    console.log("succesfully updated firstname");
                }
            });
        }
        if (req.body.lastname) {
            db.query('UPDATE matcha_users SET lastname = ? WHERE username = ?',
              [req.body.lastname, user],
              (err, results) => {
                if (err) throw err;
                else {
                    console.log("succesfully updated lastname");
                }
            });
        }
        if (req.body.password) {
            passEncrypt.hash(req.body.password, 8, (error, hashedPass) => {
                if (error) throw err;
                db.query('UPDATE matcha_users SET password = ? WHERE username = ?',
                  [hashedPass, user],
                  (err, results) => {
                    if (err) throw err;
                    else {
                        console.log("succesfully updated password");
                    }
                });
            });
        }
        if (req.body.gender) {
            db.query('UPDATE matcha_users SET gender = ?',
              [req.body.gender],
              (err, results) => {
                if (err) throw err;
                else {
                    console.log("succesfully updated gender")
                }
            });
        }
        if (req.body.sexualPreference) {
            db.query('UPDATE matcha_users SET sexualPreference = ?',
              [req.body.sexualPreference],
              (err, results) => {
                if (err) throw err;
                else {
                    console.log("succesfully updated sexualPreference");
                }
            })
        }
        if (req.body.bibliography) {
            db.query('UPDATE matcha_user SET bibliography = ?',
              [req.body.bibliography],
              (err, results) => {
                if (err) throw err;
            })
        }
        res.render('pages/home', {username: req.body.username});
    }
});

module.exports = profileRoute;
