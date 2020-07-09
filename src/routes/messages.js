import express from 'express';

import query from '../utils/dbqueries';

const messageRoute = express.Router();
// /message routes

messageRoute.route('/')
  .get(async (req, res) => {
    if (req.session.loggedin) {
      let userRooms = await query.getUserRooms(req.session.username);
      if (userRooms.length > 0) {
        res.status(200).render('pages/messages', {
          rooms: userRooms,
          user: req.session.username
        });
      } else {
        res.status(200).render('pages/messages', {
          rooms: [],
          user: req.session.username
        });
      }
    } else {
      res.status(401).render('pages/login', {
        success: true,
        message: "have an account? Enter your details to login"
      });
    }
  });

module.exports = messageRoute;
