import express from 'express';
import path from 'path';
import open from 'open';

const app = express();
const port = 3000;

// Set EJS as a templating engine
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    // res.sendFile(path.join(__dirname, './src/index.html'));
    res.render('pages/index');
});

app.get('/login', (req, res)=>{
    // res.sendFile(path.join(__dirname, './src/login.html'));
    res.render('pages/login');
});

app.get('/register', (req, res)=>{
    // res.sendFile(path.join(__dirname, './src/register.html'));
    res.render('pages/register');
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
