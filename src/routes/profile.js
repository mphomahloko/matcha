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
    console.log(req.body);
});

module.exports = router;
