import express from 'express';
import User from '../models/user';
import Auth from '../controller/auth';

const reportUserRoute = express.Router();

reportUserRoute.get('/', async (req, res) => {
    if (req.session.loggedin) {
        const reporter = req.session.username;
        const reportedUser = req.query.reporteduser;
        if (reportedUser && user) {
            try {
                const user = new User();
                const auth = new Auth();
                user.reportUser({
                    reporter: reporter,
                    reportedUser: reportedUser
                });
                await auth.reportUser(user);
                console.log(`${reportedUser} is blocked after ${reporter} reported them`);
            } catch (err) {
                console.log(err);
            }
        }
    }
    res.status(200).render('pages/register', {
        success: true,
        message: 'success'
    });
})

module.exports = reportUserRoute;