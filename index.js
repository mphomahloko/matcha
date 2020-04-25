import app from './app';
import db from './config/database/database';

const http = require('http')
  .Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.post('/messages', (req, res) => {
  // insert msg into database accordingly
  console.log(req.body.room);
  db.query('INSERT INTO messages (room_id, from_participant, to_participant, msg) VALUES (?, ?, ?, ?)',
    [req.body.room, req.body.from, req.body.to, req.body.msg],
    (err, results, field) => {
    console.log(err);
    if (results) {
      res.status(200).json({ success: true, message: "message successfully sent." });
    }
    else {
      res.status(424).json({ success: false, message: "failed to send message." });
      console.log(err);
    }
  });
  // send msg to specific user
  // io.emit(req.body.to, req.body);
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
