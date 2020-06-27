import express from 'express';

import validators from '../utils/validators';

const resetPasswordRoute = express.Router();

resetPasswordRoute.get('/', async (req, res) => {
    const linkUser = req.query.user;
    const linkToken = req.query.token;
    if (linkUser && linkToken)
    {
        res.status(200).render('pages/resetpassword', {
            success: true,
            message: 'Please enter and confirm your new password'
        });
        res.end();
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
    if (validators.validatePass(password) && validators.validateConfPass(password, confPass)) {
        console.log('yes');
        res.status(200).render('pages/login', {
            success: true,
            message: 'let us go'
        });
        res.end();
    } else if (!validators.validatePass(password) || !validators.validateConfPass(password, confPass)) {
        console.log('no');
        res.status(401).render('pages/resetpassword', {
            success: false,
            message: 'Please enter and confirm your new password'
        });
        res.end();
    }
});

module.exports = resetPasswordRoute;