import express from 'express';

import validators from '../utils/validators';
import User from "../models/user";
import Auth from "../controller/auth";
import query from '../utils/dbqueries'

const router = express.Router();
const auth = new Auth();

// /register routes
router.get('/', async (req, res) => {
    if (req.session.loggedin) {
        try {
            let user = await query.getUserDetails(req.session.username);
            let userInt = await query.getUserInterests(req.session.username);
            let suggestedUsers = await query.getSuggestedUsers();
            if (suggestedUsers.length > 0) {
              res.status(200).render('pages/home', {
                username: user[0].username,
                users: _.filter(suggestedUsers, (async (suggestedUser) => {
                  try {
                    let sugInt = await query.getUserInterests(suggestedUser.username)
                    if (sugInt.length < 0) return true;
                    let common = userInt.forEach(interest => {
                      let int = sugInt.forEach(sInt => {
                        if (sInt !== interest) return true;
                      })
                      return int === true ? true : false;
                    })
                    return common === true ? true : false;
                  } catch (e) { console.log(e)}
                }))
              })
            } else {
              res.status(200).render('pages/home', {
                username: user[0].username,
                users: []
              })
            }
          } catch (error) {
            console.log(error.message);
          }
    } else {
        res.render('pages/register', {
            success: true,
            message: 'Complete form to register'
        });
    }
    res.end();
});

router.post('/', async (req, res) => {

    let username = req.body.username;
    let pass = req.body.password;
    let email = req.body.email;
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let confPass = req.body.confirmpassword;

    if (validators.validateUsername(username) && validators.validatePass(pass) &&
        validators.validateEmail(email) && validators.validateConfPass(pass, confPass) &&
        validators.validateLastName(lastName) && validators.validateFirstName(firstName)) {
        try {
            let user = new User();
            await user.register({
                username: username,
                email : email,
                firstName: firstName,
                lastName: lastName,
                password: pass
            });
            await auth.register(user);

            res.status(200).render('pages/login', {
                success: true,
                message: 'successfully registered, please click on the link in your email to activate your account.'
            });
        } catch (e) {
            res.status(401).render('pages/register', {
                success: false,
                message: e.message
            });
        }
    } else {
        if (!validators.validateUsername(username)) {
            res.status(401).render('pages/register', {
                success: false,
                message: 'your username need to be 2 - 50 characters long and contain at least one lower case alphabet'
            });
            res.end();
        } else if (!validators.validateEmail(email)) {
            res.status(401).render('pages/register', {
                success: false,
                message: 'your email needs to be in this format: user@mail.domain'
            });
            res.end();
        } else if (!validators.validatePass(pass)) {
            console.log('a password must contain lower and upper case characters, digit(s), and special character(s)');
            res.status(401).render('pages/register', {
                success: false,
                message: 'a password must contain lower and upper case characters, digit(s), and special character(s)'
            });
            res.end();
        } else if (!validators.validateConfPass(pass, confPass)) {
            res.status(401).render('pages/register', {
                success: false,
                message: 'your confirm password must match your password'
            });
            res.end();
        }
    }
});

module.exports = router;
