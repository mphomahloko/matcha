import express from 'express';

const router = express.Router();

router.get('/', (req, res)=>{
    if (req.session.loggedin) {
		res.status(200).render('pages/notifications');
		res.end();
    } else {
		res.status(401).render('pages/login', {success: true, message: "have an account? Enter your details to login"});
		res.end();
    }
});

module.exports = router;
