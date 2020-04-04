import app from './app';
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 3000;

app.post('/messages', (req, res) => {
	// insert msg into database accordingly
    console.log(req.body);
    // send msg to specific user
	// io.emit(req.body.to, req.body);
	res.status(200).send({success: true});
});

io.on('connection', () =>{
	console.log('a user is connected');
});

const server = http.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Express is running on port ${server.address().port}`);
        console.log('visit http://localhost:3000');
    }
});
