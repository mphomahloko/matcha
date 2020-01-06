import express from 'express';
import db from '../../config/database/database';

const router = express.Router();

router.get('/', (req, res)=>{
		console.log(req.session);
    if (req.session.loggedin) {
        res.render('pages/index');
    } else {
        res.render('pages/login');
    }
    res.end();
});

// /login routes
router.post('/login', (req, res)=>{
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

router.get('/login', (req, res)=>{
    res.render('pages/login');
});

// /register routes
router.get('/register', (req, res)=>{
    res.render('pages/register');
});


router.get('*', (req, res)=>{
     res.render('pages/index');
  //  res.send("404 Page Not Found");
});

module.exports = router;

