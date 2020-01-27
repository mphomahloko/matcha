import express from 'express';

const router = express.Router();

router.get('/', (req, res)=>{
    if (req.session.loggedin) {
		res.render('notifications');
		res.end();
    } else {
		res.render('pages/index');
		res.end();
    }
});

module.exports = router;
