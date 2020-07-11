import express from 'express';
import fetch from 'node-fetch';
import passEncrypt from 'bcryptjs';
import 'dotenv/config'

import query from '../utils/dbqueries';

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
        if (req.body.firstname) await query.updateUserFirstName(req.body.firstname, user);

        if (req.body.lastname) await query.updateUserFirstName(req.body.firstname, user);

        if (req.body.password) {
          const newPass = await passEncrypt.hash(user.password, 10);
          await query.updateUserPassword(req.body.password, user);
          console.log("succesfully updated user's password");
        }

        if (req.body.gender) await query.updateUserGender(req.body.gender, user);

        if (req.body.Preference)          await query.updateUserSexualPreference(req.body.Preference, user);

        if (req.body.age) await query.updateUserAge(req.body.age, user);

        if (req.body.bio) await query.updateUserBio(req.body.bio, user);

        if (req.body.ethnicity) await query.updateUserEthnicity(req.body.ethnicity, user);

        if (req.body.interests) {
          req.body.interests.split(",").forEach(async element => {
            if (element.trim()) {
              if (!await query.getUserInterest(element.trim(), user))
                await query.updateUserInterests(element.trim(), user);
            }
          });
        }
        // redirect back to profile
        const userDetails = await query.getUserDetails(req.session.username);
        if (userDetails[0].gender && userDetails[0].bio &&
          userDetails[0].age && userDetails[0].ethnicity) {
            await query.userProfileComplete(req.session.username);
        }
        const interests = await query.getUserInterests(req.session.username);
        res.status(200).render('pages/profile', { user: userDetails[0], interests });
      } catch (error) {
        console.log(error.message);
      }
    }
  })

profileRoute.route('/location')
  .post(async (req, res) => {
    if (req.session.username) {
      try {

        let loc = {};
        const location = await fetch(`https://ipinfo.io/?token=${process.env.TOKEN}`);
        const location_data = await location.json();

        loc.latitude = location_data.loc.split(',')[0];
        loc.logitude = location_data.loc.split(',')[1];
        loc.country = location_data.country;
        loc.postal_code = location_data.postal;
        loc.city = location_data.city;
        loc.region = location_data.region;
        await query.updateUserLocation(loc, req.session.username);
        res.status(200).json({ status: true, message: "successful..." });
      } catch (error) {
        console.log(error);
        res.status(200).json({ status: false, message: "an error occured..." });
      }
    } else {
      res.status(401).json({ status: false, message: "You are not logged in..." });
    }
  });

module.exports = profileRoute;
