import express from 'express';

import Auth from '../controller/auth';
import User from '../models/user'
import validators from '../utils/validators';

const loginRoute = express.Router();
const auth = new Auth();

// /login routes
loginRoute.route('/')
  .get(async (req, res) => {
    if (req.session.loggedin) {
      res.status(200).render('pages/home', {
        username: req.session.username,
        users: []
      });
    }
    else {
      const linkName = req.query.user;
      const linkToken = req.query.token;
      if (linkToken && linkName) {
        try {
          let user = new User();
          user.activateUser({
            username: linkName,
            token: linkToken
          });
          await auth.activateAccount(user);
          res.status(200).render('pages/login', {
            success: true,
            message: 'have an account? Enter your details to login'
          });
        } catch (e) {
          res.status(401).render('pages/login', {
            success: false,
            message: e.message
          });
        }
      }
    }

  })
  .post(async (req, res) => {
    const username = req.body.username;
    const pass = req.body.password;
    if (validators.validateUsername(username) && validators.validatePass(pass)) {
      try {
        let user = new User();
        user.login({username: username, password: pass})
        user = await auth.login(user);
        req.session.loggedin = true;
        req.session.username = user.username;
        req.session.user_id = user.user_id;

        res.status(200).render('pages/home', {
          username: user.username,
          users: []
        });
      } catch (e) {
          console.log(e.message);
          res.status(401).render('pages/login', {
              success: false,
              message: e.message
          });
        }
    }
  })

module.exports = loginRoute;
