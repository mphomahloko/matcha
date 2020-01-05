import express from 'express';
import db from '../../config/database/database';

const router = express.Router();

router.get('/', (req, res)=>{
    if (req.session.loggedin) {
        res.render('pages/index');
    } else {
        res.render('pages/login');
    }
    res.end();
});

router.get('*', (req, res)=>{
    // res.render('login');
    res.send("404 Page Not Found");
});

module.exports = router;