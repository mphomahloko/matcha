import path from 'path';
import multer from 'multer';

import app from './app';
import query from './src/utils/dbqueries'

const http = require('http').Server(app);
const io = require('socket.io')(http);

const alertUser = (reciever, message) => io.emit(reciever, message);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'profilePic') cb(null, './public/img/profile')
    if (file.fieldname === 'pictures') cb (null, './public/img/pics')
  },
  filename: (req, file, cb) => {
    cb(null, `${req.session.username}-${Date.now()}${path.extname(file.originalname)}`)
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  }
}).fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'pictures', maxCount: 4 }
]);

const checkFileType = (file, cb) => {
  const fileTypes = /\.(jpe?g|png|gif|bmp)$/i;
  const fileMimeType = /image\/(gif|p?jpeg|(x-)?png)/i;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileMimeType.test(file.mimetype);
  if (mimetype && extname) return cb(null, true);
  else cb(`Error: Only images are accepted`, false)
}

app.post('/messages', async (req, res) => {
  // insert msg into database accordingly
  try {
    await query.saveMessages({
      room: req.body.room,
      from: req.body.from,
      to: req.body.to,
      msg: req.body.msg
    });
    // send msg to specific user
    await query.updateRoomMsg(req.body.room, req.body.msg)
    alertUser(req.body.to, req.body.msg)
    res.status(200).json({
      success: true,
      message: "message successfully sent."
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "failed to send message."
    });
  }
});

app.get('/details', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const user = await query.getUserDetails(req.session.username)
      if (user[0].profileCompleted > 0) {
        console.log(`${req.session.username} viewd ${req.query.user}'s profile`);
        const details = await query.getUserDetails(req.query.user);
        const interests = await query.getUserInterests(req.query.user);
        const liked = await query.isUserLiked(req.query.user, req.session.username);
        // emit to user in real time
        await query.insertNotifications(`${req.session.username} viewd your profile.`, details[0].user_id);
        // increment variable for notifications
        res.status(200).render('pages/details', {
          username: req.session.username,
          users: details,
          interests: interests,
          liked: liked
        });
      } else {
        res.status(200).render('pages/home', {
          username: user,
          users: []
        })
      }
    } catch (error) {
      res.status(401).render('pages/login', {
        success: true,
        message: 'to login to continue...'
      });
    }
  } else {
    res.status(401).render('pages/login', {
      success: true,
      message: 'have an account?... Enter your details to login'
    });
  }
})

app.post('/like', async (req, res) => {
  if (req.session.loggedin) {
    try {
      await query.likeUser(req.body.participant, req.body.liked_participant);
      const details = await query.getUserDetails(req.body.liked_participant);
      await query.insertNotifications(`${req.session.username} liked your profile.`, details[0].user_id);
      if (await query.aLikeBack(req.body.participant, req.body.liked_participant)) {
        await query.connectUsers(req.body.participant, req.body.liked_participant);
        await query.insertNotifications(`You and ${req.session.username} liked each other's profile and can start chatting in the message section`, details[0].user_id);
        await query.insertNotifications(`You and ${details[0].username} liked each other's profile and can start chatting in the message section`, req.session.user_id);
        console.log(`${req.body.participant} liked ${req.body.liked_participant}'s profile back`);
        console.log(`notifiy both users that they are connected and can start chatting`);
      }
      else console.log(`${req.body.participant} liked ${req.body.liked_participant}'s profile`);
  
      res.status(200).json({
        success: true,
        message: "like successful ..."
      });
    } catch (ex) {
      console.log(ex.message);
      res.status(200).json({
        success: false,
        message: "failed to like..."
      });
    }
  } else {
    res.status(200).json({
      success: false,
      message: "Navigate to the login page to continue..."
    });
  }
})

app.post('/dislike', async (req, res) => {
  if (req.session.loggedin) {
  try {

    await query.disLike(req.body.participant, req.body.liked_participant)
    const details = await  query.getUserDetails(req.body.liked_participant);
    console.log(`${req.body.participant} disliked ${req.body.liked_participant}'s profile at ${new Date()}`)
    await query.insertNotifications(`${req.session.username} disliked your profile.`, details[0].user_id);

    if (await query.aLikeBack(req.body.participant, req.body.liked_participant)) {
      console.log(`deleteing history messages between ${req.body.participant} and ${req.body.liked_participant}`);
      const id = await query.getRoomId(req.body.participant, req.body.liked_participant)
      await query.disConnectUsers(req.body.participant, req.body.liked_participant)
      console.log(`${req.body.participant} disconnected ${req.body.liked_participant}'s`);
      await query.deleteHistoryMsgs(id.room_id)
      console.log(`conversations between ${req.body.participant} and ${req.body.liked_participant} deleted...`);
    }
    res.status(200).json({
      success: true,
      message: "disliked user successfully ..."
    });
  } catch (error) {
    console.log(error.message);
    res.status(200).json({
      success: false,
      message: "Failed to dislike user, please try again later..."
    });
  }
} else {
  res.status(200).json({
    success: false,
    message: "Navigate to the login page to continue..."
  });
}
})

app.post('/upload', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const userDetails = await query.getUserDetails(req.session.username);
      upload(req, res, async (err) => {
        if (err) console.log(err);
        if (req.files['profilePic']) {
          await query.uploadProfilepic(userDetails[0].username, req.files['profilePic'][0].filename);
        }
        if (req.files['pictures']) {
          req.files['pictures'].forEach(async file => {
            await query.uploadUserImages(userDetails[0].user_id, file.filename);
            console.log(file.filename);
          });
        }
        if (userDetails[0].gender && userDetails[0].bio && userDetails[0].profilePic &&
          userDetails[0].age && userDetails[0].ethnicity) {
          await query.userProfileComplete(req.session.username);
        }
        const interests = await query.getUserInterests(req.session.username);
        res.status(200).render('pages/profile', { user: userDetails[0], interests });
      })
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(401).render('pages/login', {
      success: true,
      message: "have an account?... Enter your details to login"
    });
  }
})

// error route
app.get('*', (req, res) => {
  res.render('pages/index');
});

module.exports = {
  http
}
