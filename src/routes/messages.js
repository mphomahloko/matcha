import express from 'express';
import db from '../../config/database/database';

const router = express.Router();
// /message routes

router.get('/', (req, res)=>{
    if (req.session.loggedin) {
		db.query('SELECT * FROM messages', (err, results, fields)=>{
           if (results.length > 0) {
                results.forEach(element => {
					res.render('pages/messages', {msg: element.msg, user: req.session.username});
					res.end();
                });
			}
       });
    } else {
		res.render('pages/login');
    }
});


module.exports = router;
