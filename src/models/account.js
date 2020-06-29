import db from "../../config/database/database";

export default class Account {

    constructor(user) {
        this.username = user.username;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.password = user.password;
        this.active = user.active;
        this.token = user.token;

    }

    save() {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO matcha.matcha_users (password, username, email, active, firstname, lastname, token) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [this.password, this.username, this.email, this.active, this.firstName, this.lastName, this.token],
                (error, result) => {
                if (error) {
                    return  reject('Failed to create an account, Please try again later.');
                }
                return resolve(result[0]);
            });
        });
    }

    remove() {
        return new Promise((resolve, reject) => {
            db.query(
                'DELETE FROM matcha.matcha_users WHERE email=?',
                [this.email],
                (error) => {
                if (error) {
                    return reject(error);
                }
                return resolve('Account deleted.');
            });
        })
    }
}