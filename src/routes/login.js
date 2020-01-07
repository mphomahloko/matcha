import express from 'express';
import db from '../../config/database/database';

const router = express.Router();

// /login routes

router.get('/login', (req, res)=>{
    res.render('pages/login');
});

router.post('/', (req, res)=>{
    let user = req.body.username;
    let pass = req.body.password;
	if (req.session.loggedin) {
			res.render('pages/index');
			res.end();
	}
    if (user && pass) {
       db.query('SELECT * FROM matcha_users WHERE username = ? AND password = ?',
       [user, pass],(err, results, fields)=>{
           if (results.length > 0) {
               req.session.loggedin = true;
               req.session.username = user;
               res.render('pages/index');
           } else {
               res.send('Incorrect Details');
           }
           res.end();
       });
    } else {
        res.send('Please enter your details!');
        res.end();
    }
});

module.exports = router;

