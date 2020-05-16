import express from 'express';
import db from '../../config/database/database';

const homeRouter = express.Router();

homeRouter.route('/')
  .get((req, res) => {
    if (req.session.loggedin) {
      let user = req.session.loggedin;
      db.query('SELECT * FROM matcha.matcha_users',(err, results) => {
        if (results.length > 0) {
          res.status(200).render('pages/home', {
            username: user,
            users: results
          });
        } else {
          res.status(200).render('pages/home', {
            username: user,
            users: []
          });
        }
      });
      
    } else {
      res.status(401).render('pages/login', {
        success: true,
        message: 'have an account? Enter your details to login'
      });
    }
  });

module.exports = homeRouter;
