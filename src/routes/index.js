import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.render('pages/home');
  } else {
    res.render('pages/index');
  }
  res.end();
});

module.exports = router;
