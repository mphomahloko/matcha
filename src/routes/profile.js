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
    // if (req.body.username) {
    //     let validUserPattern = /(?=^.{2,50}$)(?=.*[a-z]).*$/;
    //     let user = req.body.username;
    //     let validate_user = user.match(validUserPattern);
    //     if (!validate_user) {

    //     }
    // }
});

module.exports = router;
