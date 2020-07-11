import app from './app';
import query from './src/utils/dbqueries'

const http = require('http').Server(app);
const io = require('socket.io')(http);

const alertUser = (reciever, message) => io.emit(reciever, message);

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
    alertUser(req.body.to, req.body.msg);
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

app.post('/api/dis-like/like', async (req, res) => {
  try {

    await query.likeUser(req.body.participant, req.body.liked_participant);

    if (await query.aLikeBack(req.body.participant, req.body.liked_participant)) {
      await query.connectUsers(req.body.participant, req.body.liked_participant);
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
})

app.post('/api/dis-like/dislike', async (req, res) => {
  try {

    await query.disLike(req.body.participant, req.body.liked_participant)
    console.log(`${req.body.participant} disliked ${req.body.liked_participant}'s profile at ${new Date()}`)

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
    res.status(200).json({
      success: false,
      message: "Failed to dislike user, please try again later..."
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
