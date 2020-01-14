import express from 'express';
import db from '../../config/database/database';

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
    if (!req.session.loggedin)
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
        if (req.body.email)
        {
            db.query('UPDATE matcha_users SET lastname = ?', [req.body.lastname], (err, results) => {
                if (err) throw err;
                else {
                    console.log("succesfully updated lastname");
                }
            })
        }
        if (req.body.email)
        {
            db.query('UPDATE matcha_users SET password = ?', [req.body.password], (err, results) => {
                if (err) throw err;
                else {
                    console.log("succesfully updated password");
                }
            })
        }
    }
});

module.exports = router;
