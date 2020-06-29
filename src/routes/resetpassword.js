import express from 'express';

import validators from '../utils/validators';
import User from '../models/user';
import Auth from '../controller/auth';

const resetPasswordRoute = express.Router();

resetPasswordRoute.get('/', async (req, res) => {
    const linkUser = req.query.user;
    const linkToken = req.query.token;
    if (linkUser && linkToken) {
        res.status(200).render('pages/resetpassword', {
            success: true,
            message: 'please enter your email'
        });
    } else {
        res.status(200).render('pages/login', {
            success: true,
            message: 'Have an account? login'
        });
        res.end();
    }
});

resetPasswordRoute.post('/', async (req, res) => {
    const password = req.body.password;
    const confPass = req.body.confpass;
    const linkUser = req.query.user;
    const linkToken = req.query.token;
    if (validators.validatePass(password) && validators.validateConfPass(password, confPass)) {
        try {
            console.log(password + ' ' + confPass)
            const user = new User();
            const auth = new Auth();
            await user.resetPassword({
                username: linkUser,
                token: linkToken,
                password: password
            });
            await auth.resetPassword(user);
            res.status(200).render('pages/login', {
                success: true,
                message: 'password successfully reset'
            });
        } catch (err) {
            res.status(401).render('pages/login', {
                success: false,
                message: 'could not reset password, please try again later'
            })
        }
    } else if (!validators.validatePass(password) || !validators.validateConfPass(password, confPass)) {
        res.status(401).render('pages/resetpassword', {
            success: false,
            message: 'Please enter and confirm your new password'
        });
        res.end();
    }
});

module.exports = resetPasswordRoute;