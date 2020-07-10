import express from 'express';

import query from '../utils/dbqueries';
import passEncrypt from 'bcryptjs';

const profileRoute = express.Router();

// /profile routes

profileRoute.route('/')
  .get(async (req, res) => {
    // get loggedin user from database
    if (req.session.loggedin) {
      try {
        const userDetails = await query.getUserDetails(req.session.username);
        const interests = await query.getUserInterests(req.session.username);
        res.status(200).render('pages/profile', { user: userDetails[0], interests });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      res.status(401).render('pages/login', {
        success: true,
        message: "have an account?... Enter your details to login"
      });
      res.end();
    }
  })
  .post(async (req, res) => {
    console.log(req.body);
    if (req.session.loggedin) {
      let user = req.session.username;
      // validate all given data before update
      try {
        if (req.body.username) {
          const userExists = await query.getUserDetails(req.body.username);
          if (userExists[0]) throw new Error("Username already taken...");
          await query.updateUsername(req.body.username, user);
          req.session.username = req.body.username;
          user = req.body.username;
          console.log("succesfully updated username");
        }
        if (req.body.email) {
          const emailExits = await query.findUserByEmail(req.body.email);
          if (emailExits) throw new Error("Email already in use...");
          await query.updateUserEmail(req.body.email, user);
          console.log("succesfully updated user's email");
        }
        if (req.body.firstname) {
          await query.updateUserFirstName(req.body.firstname, user);
          console.log("succesfully updated user's firstname");
        }
        if (req.body.lastname) {
          await query.updateUserFirstName(req.body.firstname, user);
          console.log("succesfully updated user's lastname");
        }
        if (req.body.password) {
          const newPass = await passEncrypt.hash(user.password, 10);
          await query.updateUserPassword(req.body.password, user);
          console.log("succesfully updated user's password");
        }
        if (req.body.gender) {
          await query.updateUserGender(req.body.gender, user);
          console.log("succesfully updated user's gender");
        }
        if (req.body.Preference) {
          await query.updateUserSexualPreference(req.body.sexualPreference, user);
          console.log("succesfully updated user's sexualPreference");
        }
        if (req.body.age) {
          await query.updateUserAge(req.body.age, user);
          console.log("succesfully updated user's age");
        }
        if (req.body.bio) {
          await query.updateUserBio(req.body.bio, user);
          console.log("succesfully updated user's bio");
        }
        if (req.body.ethnicity) {
          await query.updateUserEthnicity(req.body.ethnicity, user);
          console.log("succesfully updated user's ethnicity");
        }

        if (req.body.interests) {
          req.body.interests.split(",").forEach(async element => {
            await query.updateUserInterests(element.trim(), user);
            console.log(`succesfully inserted ${element.trim()} interest for user: ${user}`);
          });
        }
        // redirect back to profile
        const userDetails = await query.getUserDetails(req.session.username);
        const interests = await query.getUserInterests(req.session.username);
        res.status(200).render('pages/profile', { user: userDetails[0], interests });
      } catch (error) {
        console.log(error.message);
      }
    }
  });

module.exports = profileRoute;
