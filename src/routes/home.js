import express from 'express';

const homeRouter = express.Router();

homeRouter.route('/')
  .get((req, res) => {
    if (req.session.loggedin) {
      res.status(200).render('pages/home', {
        username: req.session.username
      });
    } else {
      res.status(401).render('pages/login', {
        success: true,
        message: 'have an account? Enter your details to login'
      });
    }
  });

module.exports = homeRouter;
