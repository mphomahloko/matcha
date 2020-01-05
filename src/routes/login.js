import express from 'express';

const router = express.Router();

router.post('/login', (req, res)=>{
    let user = req.body.username;
    let pass = req.body.password;

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

module.exports = router;