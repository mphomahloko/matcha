import express from 'express';
import db from '../../config/database/database';

const detailsRouter = express.Router();

detailsRouter.route('/')
    .get((req, res) => {
        if (req.session.loggedin) {
            db.query('SELECT * FROM matcha.matcha_users WHERE username=?',
                [req.query.user],
                (err, results) => {
                    if (results.length > 0) {
                        res.status(200).render('pages/details', {
                            username: req.session.username,
                            users: results
                        });
                    } else {
                        res.status(200).render('pages/details', {
                            username: req.session.username,
                            users: []
                        });
                    }
                });
        } else {
            res.status(401).render('pages/login', {
                success: true,
                message: 'have an account?... Enter your details to login'
            });
        }
    });

module.exports = detailsRouter;