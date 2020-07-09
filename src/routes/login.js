import express from 'express';
import _ from 'lodash';

import Auth from '../controller/auth';
import User from '../models/user'
import validators from '../utils/validators';
import query from '../utils/dbqueries'

const loginRoute = express.Router();
const auth = new Auth();

// /login routes
loginRoute.route('/')
  .get(async (req, res) => {
    if (req.session.loggedin) {
      try {
        let user = req.session.username;
        let suggestedUsers = await query.getSuggestedUsers();
        if (suggestedUsers.length > 0) {
          res.status(200).render('pages/home', {
            username: user,
            users: _.filter(suggestedUsers, (suggestedUser => {
              return suggestedUser.username.localeCompare(user);
            }))
          })
        } else {
          res.status(200).render('pages/home', {
            username: user,
            users: []
          })
        }
      } catch (error) {
        console.log(error.message);
      }
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
      } else {
        res.status(200).render('pages/login', {
          success: true,
          message: 'have an account? Enter your details to login'
        });
      }
    }

  })
  .post(async (req, res) => {
    const username = req.body.username;
    const pass = req.body.password;
    if (validators.validateUsername(username) && validators.validatePass(pass)) {
      try {
        let user = new User();
        let suggestedUsers = await query.getSuggestedUsers();
        user.login({ username: username, password: pass })
        user = await auth.login(user);
        // await query.lastSeen(username);
        req.session.loggedin = true;
        req.session.username = user.username;
        req.session.user_id = user.user_id;

        if (suggestedUsers.length > 0) {
          res.status(200).render('pages/home', {
            username: username,
            users: _.filter(suggestedUsers, (suggestedUser => {
              return suggestedUser.username.localeCompare(username);
            }))
          })
        } else {
          res.status(200).render('pages/home', {
            username: user.username,
            users: []
          })
        }
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
