import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

//  routes
import routeToHome from './src/routes/home';
import routeToIndex from './src/routes/index';
import routeToLogin from './src/routes/login';
import routeToRegister from './src/routes/register';
import routeToProfile from './src/routes/profile';

const app = express();

// letting express know the packages being used
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set EJS as a templating engine
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/', routeToIndex);
app.use('/login', routeToLogin);
app.use('/register', routeToRegister);
app.use('/profile', routeToProfile);
app.use('/home', routeToHome);

app.get('*', (req, res)=>{
     res.render('pages/index');
  //  res.send("404 Page Not Found");
});

module.exports = app;
