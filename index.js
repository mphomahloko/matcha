import app from './app';
import query from './src/utils/dbqueries'

const http = require('http').Server(app);
const io = require('socket.io')(http);

const sendMessage = (reciever, message) => io.emit(reciever, message);

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
    sendMessage(req.body.to, req.body.msg);
    // io.emit();
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


io.on('connection', () => {
  console.log('a user is connected');
});

module.exports = {
  http
}
