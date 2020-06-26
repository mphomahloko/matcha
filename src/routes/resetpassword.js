import express from 'express';

const resetPasswordRoute = express.Router();

resetPasswordRoute.get('/', async (req, res) => {
    res.status(200).render('pages/resetpassword', {
        success: true,
        message: 'Please enter and confirm your new password'
    })
    res.end();
});

module.exports = resetPasswordRoute;