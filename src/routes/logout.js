import express from 'express';

const router = express.Router();

router.get('/', (req, res)=>{
    if (req.session.loggedin) {
        req.session.destroy((err)=>{
			// cannot access session here
			if (err) console.log(err);
			res.render('pages/index');
			res.end();
		  })
    } else {
		res.render('pages/index');
		res.end();
    }
});

module.exports = router;
