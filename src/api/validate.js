import express from 'express';
import validators from '../models/validators';

const router = express.Router();

// { name: 'username', value: 'test' } expected json
router.post('/', (req, res) => {
  if (req.body.name === 'username') {
    if (validators.validateUsername(req.body.value)) {
      res.status(200).send({ success: true, field: req.body.name });
    } else {
      res.status(200).send({ success: false, field: req.body.name });
    }
  } else if (req.body.name === 'firstname') {
    if (validators.validateFirstName(req.body.value)) {
      res.status(200).send({ success: true, field: req.body.name });
    } else {
      res.status(200).send({ success: false, field: req.body.name });
    }
  } else if (req.body.name === 'lastname') {
    if (validators.validateLastName(req.body.value)) {
      res.status(200).send({ success: true, field: req.body.name });
    } else {
      res.status(200).send({ success: false, field: req.body.name });
    }
  } else if (req.body.name === 'email') {
    if (validators.validateEmail(req.body.value)) {
      res.status(200).send({ success: true, field: req.body.name });
    } else {
      res.status(200).send({ success: false, field: req.body.name });
    }
  } else if (req.body.name === 'password') {
    if (validators.validatePassword(req.body.value)) {
      res.status(200).send({ success: true, field: req.body.name });
    } else {
      res.status(200).send({ success: false, field: req.body.name });
    }
  } else {
    res.status(200).send({ success: false, message: 'not implemented yet' });
  }
  res.end();
});

module.exports = router;
