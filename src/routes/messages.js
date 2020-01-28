import express from 'express';
import db from '../../config/database/database';

const router = express.Router();

// /message routes

router.get('/', (req, res)=>{
    if (req.session.loggedin) {
		db.query('SELECT * FROM messages', (err, results, fields)=>{
           if (results.length > 0) {
                results.forEach(element => {
					console.log(element);
                });
			}
			res.render('pages/messages');
			res.end();
       });
    } else {
		res.render('pages/login');
    }
});

router.post('/', (req, res)=>{
	// insert msg into database accordingly
	console.log(req.body);
	res.status(200).send({success: true});
});

module.exports = router;
