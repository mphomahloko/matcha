import express from 'express';
import passConfMatch from 'bcryptjs';
import db from '../../config/database/database';
import validators from '../models/validators';

const loginRoute = express.Router();

// /login routes
loginRoute.route('/')
  .get((req, res) => {
    if (req.session.loggedin) {
      res.status(200).render('pages/home', {
        username: req.session.username,
        users: []
      });
    }
    else {
      res.status(200).render('pages/login', {
        success: true,
        message: 'have an account? Enter your details to login'
      });
    }
  })
  .post((req, res) => {
    const user = req.body.username;
    const pass = req.body.password;
    if (validators.validateUsername(user) && validators.validatePass(pass)) {
      db.query('SELECT * FROM matcha.matcha_users WHERE username = ?',
        [user], (err, results) => {
          if (results.length > 0) {
            results.forEach((element) => {
              const hashedPassw = element.password;
              passConfMatch.compare(pass, hashedPassw, (pssErr, isMatch) => {
                if (pssErr) return res.send(err);
                if (isMatch) {
                  req.session.loggedin = true;
                  req.session.username = user;
                  req.session.user_id = element.user_id;
                  res.status(200).render('pages/home', {
                    username: user,
                    users: []
                   });
                }
                else res.status(401).render('pages/login', { success: false, message: 'Incorrect password' });
              });
            });
          }
          else res.status(401).render('pages/login', { success: false, message: 'Incorrect username' });
        });
    }
    else res.status(401).render('pages/login', { success: false, message: 'username or password incorrect.' });
  });

module.exports = loginRoute;
