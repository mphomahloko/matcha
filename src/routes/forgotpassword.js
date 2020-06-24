import express from 'express';

import validators from '../utils/validators';
import User from '../models/forgotpass';

const forgotPasswordRoute = express.Router();

forgotPasswordRoute.get('/', async (req, res) => {
    if (req.session.loggedin) {
        res.status(200).render('pages/profile', {
            username: req.session.username
        });
    } else {
        res.status(200).render('pages/forgotpassword', {
            success: true,
            message: 'Complete form to register'
        });
    }
    res.end();
});

forgotPasswordRoute.post('/', async (req, res) => {
    const email = req.body.forpassemail;
    if (validators.validateEmail(email)) {
        try {
            let user = new User(email);
            user = await user.findEmailUser();
            if (user) {
                console.log(user);
            } else {
                console.log("non existing user");
                res.status(200).render('pages/forgotpassword', {
                    success: true,
                    message: 'check your email'
                });
            }
        } catch (err) {
            console.log('there was an issue when trying to find user, make sure that everything is up and running');
        }
    } else {
        res.status(401).render('pages/forgotpassword', {
            success: false,
            message: 'invalid email format, an email must resemble: "email@host.domain"'
        });
    }
});

module.exports = forgotPasswordRoute;