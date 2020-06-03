import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

//  routes
import routeToHome from './src/routes/home';
import routeToIndex from './src/routes/index';
import routeToLogin from './src/routes/login';
import routeToLogout from './src/routes/logout';
import routeToDetails from './src/routes/details';
import routeToProfile from './src/routes/profile';
import routeToMessages from './src/routes/messages';
import routeToRegister from './src/routes/register';
import routeToNotifications from './src/routes/notifications';

// api's
import disLikeAPI from './src/api/dis-like';
import validationAPI from './src/api/validate';
import messagesAPI from './src/api/messages';

const app = express();

// Middleware
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
app.use('/details', routeToDetails);
app.use('/register', routeToRegister);
app.use('/messages', routeToMessages);
app.use('/notifications', routeToNotifications);

// defined api's
app.use('/api/dis-like', disLikeAPI);
app.use('/api/validate', validationAPI);
app.use('/api/messages', messagesAPI);

// error route
app.get('*', (req, res) => {
  res.render('pages/index');
});

module.exports = app;
