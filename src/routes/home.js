import express from 'express';
import _ from 'lodash';
import query from '../utils/dbqueries'

const homeRouter = express.Router();

homeRouter.route('/')
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

    } else {
      res.status(401).render('pages/login', {
        success: true,
        message: 'have an account?... Enter your details to login'
      });
    }
  });

module.exports = homeRouter;
