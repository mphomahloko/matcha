import dbc from '../../config/database/connection';

let matchaQueries = {};

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

module.exports = matchaQueries;
