import express from 'express';
import path from 'path';
import open from 'open';

const app = express();
const port = 3000;

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, './src/index.html'));
});

app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, './src/login.html'));
});

app.get('/register', (req, res)=>{
    res.sendFile(path.join(__dirname, './src/register.html'));
});

app.get('*', (req, res)=>{
    // res.render('login');
    res.send("404 Page Not Found");
});

app.listen(port, (err)=>{
    if (err){
        console.log(err);
    } else {
        open('http://localhost:' + port);
        console.log('listening to port:' + port);
    }
});
