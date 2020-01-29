import express from 'express';
import db from '../../config/database/database';

// const http = require('http').Server(express());
// const io = require('socket.io')(http);
const router = express.Router();
// /message routes

router.get('/', (req, res)=>{
    if (req.session.loggedin) {
		db.query('SELECT * FROM messages', (err, results, fields)=>{
           if (results.length > 0) {
                results.forEach(element => {
					res.render('pages/messages', {msg: element.msg});
					res.end();
                });
			}
       });
    } else {
		res.render('pages/login');
    }
});


module.exports = router;
