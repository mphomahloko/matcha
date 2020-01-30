import express from 'express';
import validators from '../models/validators';

const router = express.Router();

// { name: 'username', value: 'test' } expected json
router.post('/', (req, res) => {
    if (req.body.name == 'username') {
        if (validators.validateUsername(req.body.value)) {
            res.status(200).send({fieldStatus: true});
        } else {
            res.status(200).send({fieldStatus: false});
        }
    } else if (req.body.name == 'firstname') {
        let validFirstNPattern = /(?=^.{2,50}$)(?=.*[a-z]).*$/;
        let firstname = req.body.value;

        let validate_first_name = firstname.match(validFirstNPattern);
        if (!validate_first_name) {
            res.status(200).send({fieldStatus: false});
        } else {
            res.status(200).send({fieldStatus: true});
        }
    } else if (req.body.name == 'lastname') {
        let validLastNPattern = /(?=^.{2,50}$)(?=.*[a-z]).*$/;
        let lastname = req.body.value;

        let validate_last_name = lastname.match(validLastNPattern);
        if (!validate_last_name) {
            res.status(200).send({fieldStatus: false});
        } else {
            res.status(200).send({fieldStatus: true});
        }
    } else if (req.body.name == 'email') {
        if (validators.validateEmail(req.body.value)) {
            res.status(200).send({fieldStatus: true});
        } else {
            res.status(200).send({fieldStatus: false});
        }
    } else if (req.body.name == 'password') {
        if (validators.validatePassword(req.body.value)) {
            res.status(200).send({fieldStatus: true});
        } else {
            res.status(200).send({fieldStatus: false});
        }
    } else {
        res.status(200).send({fieldStatus: "not implemented yet"});
    }
    res.end();
});

module.exports = router;
