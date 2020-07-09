import app from './app';
import query from './src/utils/dbqueries'

const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

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
    io.emit(req.body.to, req.body.msg);
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

const server = http.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Express is running on port ${server.address().port}`);
  }
});
