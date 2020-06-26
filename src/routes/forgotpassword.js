import express from 'express';

import validators from '../utils/validators';
import User from '../models/user';
import Auth from '../controller/auth';

const forgotPasswordRoute = express.Router();

forgotPasswordRoute.get('/', async (req, res) => {
    if (req.session.loggedin) {
        res.status(200).render('pages/profile', {
            username: req.session.username
        });
    } else {
        res.status(200).render('pages/forgotpassword', {
            success: true,
            message: 'Please insert your email address'
        });
    }
    res.end();
});

forgotPasswordRoute.post('/', async (req, res) => {
    const email = req.body.forpassemail;
    if (validators.validateEmail(email)) {
        try {
            let user = new User();
            const auth = new Auth;
            user.forgotPassword(email);
            await auth.forgotPassword(user);
            res.status(200).render('pages/login', {
                success: true,
                message: 'check your email'
            });
        } catch (err) {
            console.log('there was an issue when trying to find user, make sure that everything is up and running');
            res.status(401).render('pages/login', {
                success: false,
                message: 'we are experiencing technical difficulties at this time, please try again later'
            });
        }
    } else {
        res.status(401).render('pages/forgotpassword', {
            success: false,
            message: 'invalid email format, an email must resemble: "email@host.domain"'
        });
    }
});

module.exports = forgotPasswordRoute;