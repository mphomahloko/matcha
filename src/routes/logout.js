import express from 'express';

const router = express.Router();

router.get('/', (req, res)=>{
    if (req.session.loggedin) {
        req.session.destroy((err)=>{
			// cannot access session here
			if (err) console.log(err);
			res.status(200).render('pages/index');
			res.end();
		  });
    } else {
		res.status(200).render('pages/index');
		res.end();
    }
});

module.exports = router;
