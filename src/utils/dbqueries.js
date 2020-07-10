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
		dbc.query('SELECT * FROM matcha.messages WHERE messages.room_id=?',
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

matchaQueries.getUserRooms = (username) => {
	return new Promise((resolve, reject) => {
		dbc.query('SELECT * FROM matcha.rooms WHERE participant_1=? OR participant_2=?',
			[username, username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result);
			})
	})
}

/**
 * PROFILE SECTION
 */

matchaQueries.updateUsername = (newUsername, username) => {
	return new Promise((resolve, reject) => {
		dbc.query('UPDATE matcha.matcha_users SET username=? WHERE username=?',
			[newUsername, username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			})
	})
}

matchaQueries.updateUserEmail = (newEmail, username) => {
	return new Promise((resolve, reject) => {
		dbc.query('UPDATE matcha.matcha_users SET email=? WHERE username=?',
			[newEmail, username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			})
	})
}

matchaQueries.findUserByEmail = (newEmail) => {
	return new Promise((resolve, reject) => {
		dbc.query('SELECT * matcha.matcha_users WHERE email=?',
			[newEmail],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			})
	})
}

matchaQueries.updateUserFirstName = (firstname, username) => {
	return new Promise((resolve, reject) => {
		dbc.query('UPDATE matcha.matcha_users SET firstname=? WHERE username=?',
			[firstname, username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			})
	})
}


matchaQueries.updateUserLasttName = (firstname, username) => {
	return new Promise((resolve, reject) => {
		dbc.query('UPDATE matcha.matcha_users SET lastname=? WHERE username=?',
			[firstname, username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			})
	})
}

matchaQueries.updateUserPassword = (password, username) => {
	return new Promise((resolve, reject) => {
		dbc.query('UPDATE matcha.matcha_users SET password=? WHERE username=?',
			[password, username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			})
	})
}


matchaQueries.updateUserGender = (gender, username) => {
	return new Promise((resolve, reject) => {
		dbc.query('UPDATE matcha.matcha_users SET gender=? WHERE username=?',
			[gender, username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			})
	})
}

matchaQueries.updateUserAge = (age, username) => {
	return new Promise((resolve, reject) => {
		dbc.query('UPDATE matcha.matcha_users SET age=? WHERE username=?',
			[age, username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			})
	})
}

matchaQueries.updateUserSexualPreference = (sexualPreference, username) => {
	return new Promise((resolve, reject) => {
		dbc.query('UPDATE matcha.matcha_users SET sexualPreference=? WHERE username=?',
			[sexualPreference, username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			})
	})
}

matchaQueries.updateUserBio = (sexualPreference, username) => {
	return new Promise((resolve, reject) => {
		dbc.query('UPDATE matcha.matcha_users SET bio=? WHERE username=?',
			[sexualPreference, username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			})
	})
}

matchaQueries.updateUserEthnicity = (ethnicity, username) => {
	return new Promise((resolve, reject) => {
		dbc.query('UPDATE matcha.matcha_users SET ethnicity=? WHERE username=?',
			[ethnicity, username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			})
	})
}

matchaQueries.updateUserInterests = (interests, username) => {
	return new Promise((resolve, reject) => {
		dbc.query('INSERT INTO matcha.interests(interestName, username) VALUES(?,?)',
			[interests, username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				console.log();
				return resolve(result[0]);
			})
	})
}

matchaQueries.getUserInterests = (username) => {
	return new Promise((resolve, reject) => {
		dbc.query('SELECT * FROM matcha.interests WHERE username=?',
			[username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				console.log();
				return resolve(result);
			})
	})
}


matchaQueries.getUserInterest = (interest, username) => {
	return new Promise((resolve, reject) => {
		dbc.query('SELECT * FROM matcha.interests WHERE username=? AND interestName=?',
			[username, interest],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			})
	})
}

matchaQueries.updateUserLocation = (loc, username) => {
	return new Promise((resolve, reject) => {
		dbc.query(`UPDATE matcha.matcha_users 
								SET logitude=?, latitude=?, country=?, postal_code=?, city=?, region=?
								WHERE username=?`,
			[loc.logitude, loc.latitude, loc.country, loc.postal_code, loc.city, loc.region, username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			})
	})
}

matchaQueries.userProfileComplete = (username) => {
	return new Promise((resolve, reject) => {
		dbc.query(`UPDATE matcha.matcha_users 
								SET profileCompleted="1"
								WHERE username=?`,
			[username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			})
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

matchaQueries.getSuggestedUsers = () => {
	return new Promise((resolve, reject) => {
		dbc.query('SELECT * FROM matcha.matcha_users',
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result);
			})
	})
}

/**
 * LOGOUT/LOGIN SECTION
 */



matchaQueries.status = (username) => {
	return new Promise((resolve, reject) => {
		dbc.query('UPDATE matcha.matcha_users SET status="online" WHERE username=?',
			[username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			})
	})
}

matchaQueries.lastSeen = (username) => {
	return new Promise((resolve, reject) => {
		dbc.query('UPDATE matcha.matcha_users SET lastseen=?, status="offline" WHERE username=?',
			[new Date(), username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result[0]);
			})
	})
}

/**
 * SEARCH SECTION
 */

matchaQueries.search = (obj) => {
	return new Promise((resolve, reject) => {
		dbc.query(`SELECT * FROM matcha.matcha_users 
								WHERE city=?
								OR age > ? AND age < ?
								OR fameRating > ? AND fameRating < ?`,
			[obj.city, obj.min_age, obj.max_age, obj.min_fame, obj.max_fame],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result);
			})
	})
}

module.exports = matchaQueries;
