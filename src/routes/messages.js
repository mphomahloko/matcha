import express from 'express';
import db from '../../config/database/database';

const router = express.Router();
// /message routes

router.get('/', (req, res)=>{
    if (req.session.loggedin) {
		db.query('SELECT * FROM messages', (err, results, fields)=>{
           if (results.length > 0) {
             results.forEach(element => {
               res.status(200).render('pages/messages', {msg: element.msg, user: req.session.username});
               res.end();
              });
            } else {
              res.status(200).render('pages/messages', {msg: "", user: req.session.username});
              res.end();
            }
       });
    } else {
      res.status(401).render('pages/login', {success: true, message: "have an account? Enter your details to login"});
      res.end();
    }
});

module.exports = router;
