import express from 'express';

import User from '../models/user';
import Auth from '../controller/auth';

const adminRoute = express.Router();

adminRoute.get('/', async (req, res) => {
    if (req.session.loggedIn) {
        const username = req.session.username;
        let user = new User();
        let auth = new Auth();

        user.isAdmin(username);
        await auth.isAdmin(user);

        res.render('pages/home', {
            success: true,
            message: 'work in progress'
        })
    } else {
        res.render('pages/index', {
            success: false,
            message: 'work in progress'
        })
    }
})

module.exports = adminRoute;