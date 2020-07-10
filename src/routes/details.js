import express from 'express';
import query from '../utils/dbqueries';

const detailsRouter = express.Router();

detailsRouter.route('/')
  .get(async (req, res) => {
    if (req.session.loggedin) {
      try {
        const user = await query.getUserDetails(req.session.username)
        const details = await query.getUserDetails(req.query.user);
        const interests = await query.getUserInterests(req.query.user);
        const liked = await query.isUserLiked(req.query.user, req.session.username);
        if (user[0].profileCompleted > 0) {
          res.status(200).render('pages/details', {
            username: req.session.username,
            users: details,
            interests: interests,
            liked: liked
          });
        } else {
          res.status(200).render('pages/home', {
            username: user,
            users: []
          })
        }
      } catch (error) {
        res.status(401).render('pages/login', {
          success: true,
          message: 'to login to continue...'
        });
      }
    } else {
      res.status(401).render('pages/login', {
        success: true,
        message: 'have an account?... Enter your details to login'
      });
    }
  })

module.exports = detailsRouter;
