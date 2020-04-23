import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

//  routes
import routeToHome from './src/routes/home';
import routeToIndex from './src/routes/index';
import routeToLogin from './src/routes/login';
import routeToLogout from './src/routes/logout';
import routeToValidate from './src/api/validate';
import routeToProfile from './src/routes/profile';
import routeToMessages from './src/routes/messages';
import routeToRegister from './src/routes/register';
import routeToNotifications from './src/routes/notifications';

const app = express();

// letting express know the packages being used
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set EJS as a templating engine
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// static files
app.use(express.static(`${__dirname}/public`));

// defined routes
app.use('/', routeToIndex);
app.use('/home', routeToHome);
app.use('/login', routeToLogin);
app.use('/logout', routeToLogout);
app.use('/profile', routeToProfile);
app.use('/register', routeToRegister);
app.use('/validate', routeToValidate);
app.use('/messages', routeToMessages);
app.use('/notifications', routeToNotifications);

app.get('*', (req, res) => {
  res.render('pages/index');
  //  res.send("404 Page Not Found");
});

module.exports = app;
