import express from 'express';

const router = express.Router();

router.get('/', (req, res)=>{
    if (req.session.loggedin) {
        res.render('pages/home', {username: req.session.username});
    } else {
        res.render('pages/login');
    }
    res.end();
});

module.exports = router;
