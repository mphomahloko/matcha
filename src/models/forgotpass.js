import db from '../../config/database/database';

export default class ForgotPass {
    constructor(email) {
        this.email = email;
    }

    findEmailUser() {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM matcha.matcha_users WHERE email = ?',
                [this.email],
                (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(res[0]);
                })
        })
    }
}