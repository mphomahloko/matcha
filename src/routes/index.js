import express from 'express';

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

module.exports = router;

