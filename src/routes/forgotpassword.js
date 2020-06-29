import express from 'express';

import validators from '../utils/validators';
import User from '../models/user';
import Auth from '../controller/auth';

const forgotPasswordRoute = express.Router();

forgotPasswordRoute.get('/', async (req, res) => {
    res.status(200).render('pages/forgotpassword', {
        success: true,
        message: 'Please insert your email address'
    });
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
            
        } catch (err) {
            console.log(err);
        } finally {
            res.status(200).render('pages/login', {
                success: true,
                message: 'check your email'
            });
            res.end();
        }
    } else {
        res.status(401).render('pages/forgotpassword', {
            success: false,
            message: 'invalid email format, an email must resemble: "email@host.domain"'
        });
        res.end();
    }
});

module.exports = forgotPasswordRoute;