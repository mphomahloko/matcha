import open from 'open';
// import path from 'path'; removed cause of ejs
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import db from './config/database/database';


const app = express();
const port = 3000;

// letting express know the packages being used
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set EJS as a templating engine
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    if (req.session.loggedin) {
        res.render('pages/index');
    } else {
        res.render('pages/login');
    }
    res.end();
});

// move to routes when it works
app.post('/login', (req, res)=>{
    let user = req.body.username;
    let pass = req.body.password;

    if (user && pass) {
       db.query('SELECT * FROM matcha_users WHERE username = ? AND password = ?',
       [user, pass],(err, results, fields)=>{
           if (results.length > 0) {
               req.session.loggedin = true;
               req.session.username = user;
               res.render('pages/index');
           } else {
               res.send('Incorrect Details');
           }
           res.end();
       });
    } else {
        res.send('Please enter your details!');
        res.end();
    }
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
