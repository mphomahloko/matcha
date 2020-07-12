import express from 'express';

import query from '../utils/dbqueries';

const router = express.Router();

router.get('/', async (req, res) => {
  if (req.session.loggedin) {
    const user = await query.getUserDetails(req.session.username);
    const notifications = await query.getUserNotifications(user[0].user_id);
    res.status(200).render('pages/notifications', {
      notifications: notifications.sort((a, b) => a.user_id < b.user_id === true ? 1 : -1)
    });
  } else {
    res.status(401).render('pages/login', {
      success: true,
      message: "have an account? Enter your details to login"
    });
    res.end();
  }
});

module.exports = router;
