import express from 'express';
import _ from 'lodash';

import query from '../utils/dbqueries'

const homeRouter = express.Router();

homeRouter.route('/')
  .get(async (req, res) => {
    if (req.session.loggedin) {
      try {
        let user = await query.getUserDetails(req.session.username);
        let userInt = await query.getUserInterests(req.session.username);
        let suggestedUsers = await query.getSuggestedUsers();
        if (suggestedUsers.length > 0) {
          res.status(200).render('pages/home', {
            username: user[0].username,
            users: _.filter(suggestedUsers, (async (suggestedUser) => {
              try {
                let sugInt = await query.getUserInterests(suggestedUser.username)
                if (sugInt.length < 0) return true;
                let common = userInt.forEach(interest => {
                  let int = sugInt.forEach(sInt => {
                    if (sInt !== interest) return true;
                  })
                  return int === true ? true : false;
                })
                return common === true ? true : false;
              } catch (e) { console.log(e)}
            }))
          })
        } else {
          res.status(200).render('pages/home', {
            username: user[0].username,
            users: []
          })
        }
      } catch (error) {
        console.log(error.message);
      }

    } else {
      res.status(401).render('pages/login', {
        success: true,
        message: 'have an account?... Enter your details to login'
      });
    }
  })
  .post(async (req, res) => {
    if (req.session.loggedin) {
      try {
        let user = req.session.username;
        let suggestedUsers = await query.search(req.body);
        if (suggestedUsers.length > 0) {
          res.status(200).render('pages/home', {
            username: user,
            users: _.filter(suggestedUsers, (async (suggestedUser) => {
              if (req.body.interests) {
                let interests = await query.getUserInterests(suggestedUser.username);
                return interests.forEach(interest => {
                  if (interest === req.body.interests) return false;
                })
              }
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
    } else {
      res.status(401).render('pages/login', {
        success: true,
        message: 'have an account?... Enter your details to login'
      });
    }
  })

module.exports = homeRouter;
