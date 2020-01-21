import express from 'express';
import db from '../../config/database/database';
import validate from '../api/validate';
import passConfMatch from 'bcrypt';

const router = express.Router();

// /login routes

router.get('/', (req, res)=>{
    res.render('pages/login');
});

router.post('/', (req, res)=>{
    let user = req.body.username;
    let pass = req.body.password;
	if (req.session.loggedin) {
			res.render('pages/home');
			res.end();
	}
    if (user && pass) {
       db.query('SELECT * FROM matcha_users WHERE username = ?',
       [user],(err, results, fields)=>{
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
                        } else {
                            res.send('Incorrect Details');
                            console.log('wrong password');
                        }
                        res.end();
                    });
                });
           }
       });
    } else {
        res.send('Please enter your details!');
        res.end();
    }
});

module.exports = router;
