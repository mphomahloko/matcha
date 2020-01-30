import express from 'express';
import db from '../../config/database/database';
import validators from '../models/validators';
import passConfMatch from 'bcryptjs';

const router = express.Router();

// /login routes

router.get('/', (req, res) => {
	if (req.session.loggedin) {
        res.render('pages/home', {username: req.session.username});
        res.end();
    } else {
        res.render('pages/login');
    }
});

router.post('/', (req, res)=>{
    let user = req.body.username;
    let pass = req.body.password;
    if (validators.validateUsername(user) && validators.validatePassword(pass)) {
       db.query('SELECT * FROM matcha_users WHERE username = ?',
       [user],(err, results, fields) => {
           if (results.length > 0) {
                results.forEach(element => {
                    let hashedPassw = element.password;
                    passConfMatch.compare(pass, hashedPassw, (err, isMatch) => {
                        if (err) {
                            return err;
                        } else if (isMatch) {
                            req.session.loggedin = true;
                            req.session.username = user;
                            res.render('pages/home', {username: user});
                            res.end();
                        } else {
                            res.status(401).send({success: false, message: "Incorrect password"});
                            res.end();
                        }
                    });
                });
            } else {
                res.status(401).send({success: false, message: "Incorrect username"});
                res.end();
            }
       });
    } else {
        res.status(401).send({success: false, message: "username or password incorrect."});
        res.end();
    }
});

module.exports = router;
