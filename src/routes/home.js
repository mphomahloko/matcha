import express from 'express';

const router = express.Router();

router.get('/', (req, res)=>{
    if (req.session.loggedin) {
        console.log(req.body);
        res.render('pages/home', {username: req.body.username});
    } else {
        res.render('pages/index');
    }
    res.end();
});

module.exports = router;
