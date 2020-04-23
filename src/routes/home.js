import express from 'express';

const homeRouter = express.Router();

homeRouter.route('/')
  .get((req, res) => {
    if (req.session.loggedin) {
      return res.status(200).render('pages/home', {
        username: req.session.username
      });
    }
    return res.status(401).render('pages/login', {
      success: true,
      message: 'have an account? Enter your details to login'
    });
  });

module.exports = homeRouter;
