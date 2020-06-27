import db from '../../config/database/database'
import passEncrypt from 'bcryptjs';
import { regToken } from '../utils/registrationToken';

export default class User {

    async register(user) {
        this.username = user.username;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.token = regToken(20);
        this.active = 0;
        this.password = await passEncrypt.hash(user.password, 10);
    }

    login(user) {
        this.username = user.username;
        this.password = user.password;
    }

    activateUser(user) {
        this.username = user.username;
        this.token = user.token;
    }

    forgotPassword(email) {
        this.email = email;
    }

    async resetPassword(user) {
        this.username = user.username;
        this.token = user.token;
        this.newToken = regToken(20);
        this.newPass = await passEncrypt.hash(user.password, 10);
    }

    findByUsername() {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM matcha.matcha_users WHERE username=?`,
                [this.username],
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result[0]);
                }
            );
        });
    }

    findByEmail() {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM matcha.matcha_users WHERE email=?`,
                [this.email],
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result[0]);
                }
            );
        });
    }

    verifyUser() {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE matcha.matcha_users SET active=?, token=? WHERE username=? AND token=?',
                [1, '', this.username, this.token],
                (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result[0])
            });
        })

    }

    changePassword() {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE matcha.matcha_users SET password=?, token=? WHERE username=? AND token=?',
                [this.newPass, this.newToken, this.username, this.token],
                (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(res[0]);
                }
            );
        });
    }
}
