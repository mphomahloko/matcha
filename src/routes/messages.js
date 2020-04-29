import express from 'express';
import db from '../../config/database/database';

const messageRoute = express.Router();
// /message routes

messageRoute.route('/')
  .get((req, res) => {
    if (req.session.loggedin) {
      let user =  req.session.username;
		  db.query('SELECT * FROM matcha.rooms WHERE participant_1=? OR participant_2=?',
				  [user, user], (err, results, fields) => {
           if (results.length > 0) {
              res.status(200).render('pages/messages', {
                rooms: results,
                user: req.session.username
              });
            } else {
              res.status(200).render('pages/messages', {
                rooms: [],
                user: req.session.username
              });
            }
       });
    } else {
      res.status(401).render('pages/login', {
        success: true,
        message: "have an account? Enter your details to login"
      });
    }
  });

module.exports = messageRoute;
