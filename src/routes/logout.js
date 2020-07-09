import express from 'express';

import query from '../utils/dbqueries';

const logoutRoute = express.Router();

logoutRoute.route('/')
	.get(async (req, res) => {
		if (req.session.loggedin) {
			const username = req.session.username;
			req.session.destroy(async (err) => {
				if (err) console.log(err);
				try {
					await query.lastSeen(username);
				} catch (error) {
					console.log(error.message);
				}
				res.status(200).render('pages/index');
				res.end();
			});
		} else {
			res.status(200).render('pages/index');
			res.end();
		}
	});

module.exports = logoutRoute;
