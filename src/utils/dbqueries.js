import dbc from '../../config/database/connection';

let matchaQueries = {};

/**
 * LIKE OR DISLIKE SECTION
 */

matchaQueries.isUserLiked = (participant, liked_participant) => {
	return new Promise((resolve, reject) => {
		dbc.query('SELECT * FROM matcha.likes WHERE participant=? AND liked_participant=?',
			[participant, liked_participant],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			});
	});
}

matchaQueries.likeUser = (participant, liked_participant) => {
	return new Promise((resolve, reject) => {
		dbc.query('INSERT INTO matcha.likes (participant, liked_participant) VALUES (?, ?)',
			[participant, liked_participant],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			}
		);
	})
}

matchaQueries.userLikedBack = (participant, liked_participant) => {
	return new Promise((resolve, reject) => {
		dbc.query(`INSERT INTO matcha.rooms (participant_1, participant_2)
                            SELECT participant, liked_participant
                            FROM matcha.likes
                            WHERE liked_participant LIKE ?
                            AND participant LIKE ?;`,
			[participant, liked_participant],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			})
	});
};

matchaQueries.disLike = (participant, liked_participant) => {
	return new Promise((resolve, reject) => {
		dbc.query('DELETE FROM matcha.likes WHERE participant=? AND liked_participant=?',
			[participant, liked_participant],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			})
	})
}

/**
 * MESSAGE SECTION
 */

matchaQueries.getUserMessages = (id) => {
	return new Promise((resolve, reject) => {
		dbc.query('SELECT * FROM matcha.messages WHERE messages.room_id = ?',
			[id],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result);
			})
	})
}

matchaQueries.saveMessages = (data) => {
	return new Promise((resolve, reject) => {
		dbc.query('INSERT INTO matcha.messages (room_id, from_participant, to_participant, msg) VALUES (?, ?, ?, ?)',
			[data.room, data.from, data.to, data.msg],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			});
	})
}

/**
 * DETAILS SECTION
 */

matchaQueries.getUserDetails = (username) => {
	return new Promise((resolve, reject) => {
		dbc.query('SELECT * FROM matcha.matcha_users WHERE username=?',
			[username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result);
			})
	})
}

module.exports = matchaQueries;
