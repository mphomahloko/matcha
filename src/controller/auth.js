import passEncrypt from 'bcryptjs';
import Account from '../models/account';
import { mail } from '../utils/mail'

export default class Auth {
    async login(userModel) {
        let user = await userModel.findByUsername();
        if (!user) {
            throw new Error("Incorrect username or password");
        }
        const isMatch = await passEncrypt.compare(userModel.password, user.password);
        if (!isMatch) {
            throw new Error("Incorrect username or password");
        }
        if (user.active !== 1) {
            throw new Error('Please activate your account by clicking on the link in your email');
        }
        user.password = '';
        return user;
    }

    async activateAccount(userModel) {
        try {
            await userModel.verifyUser();
        } catch (e) {
            throw new Error('An error occurred verifying your account, please try again...')
        }
    }

    async register(userModel) {
        let user = await userModel.findByEmail();

        if (user) {
            throw new Error('email already exists, try to login...')
        }

        user = await userModel.findByUsername();
        if (user) {
            throw new Error('Username already taken.')
        }

        let account = await new Account(userModel);
        const message = `<p>Congradulations, you have started on the right journey to find your true love with online dating</p>
               <p>Please click on this <a href="http://localhost:4000/login?user=${account.username}&token=${account.token}">link</a>
               to activate your account</p>`;
        const subject = 'Welcome to Matcha';
        try {
            await account.save();
            await mail(account, subject, message);
        } catch (e) {
            await account.remove();
            throw new Error('could not create account, please try again later.');
        }
    }

    async forgotPassword(userModel) {
        let user = await userModel.findByEmail();

        if (!user) {
            throw new Error('non existant user');
        } else {
            let account = new Account(user);
            const message = `<p>Please click on this <a href="http://localhost:4000/resetpass?user=${account.username}&token=${account.token}">link</a> to reset your password.</p>
                    <p>If you did not initiate the process then your account is under cyber attack.</p>`;
            const subject = 'Password reset.';
            try {
                await mail(account, subject, message);
            } catch (err) {
                throw new Error('Could not send email for some reason.');
            }
        }
    }

    async resetPassword(userModel) {
        let user = await userModel.findByUsername();

        if (!user) {
            throw new Error('non existant user')
        } else {
            if (user.token === userModel.token) {
                try {
                    await userModel.changePassword();
                } catch (err) {
                    throw new Error('could not change password');
                }
            }
        }
    }
}