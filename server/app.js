const express = require('express');
const morgan = require('morgan');
const path = require('path');
var _ = require('lodash'); 
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var sessions = require('client-sessions');

var quizRouter = require('./routes/quiz');
var authorizationRouter = require('./routes/authorization');
var models = require('../models');

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(sessions({
  cookieName: 'user', // cookie name dictates the key name added to the request object
  secret: 'test', // NEEDS TO BE CHANGED
  duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function (username, password, done) {
    // console.log('usernameeee: ', username)
    return done(null, username);
    // models.users_full.findOne({ username: username }, function (err, user) {
    //   // if (err) { return done(err); }
    //   // if (!user) { return done(null, false); }
    //   // if (!user.verifyPassword(password)) { return done(null, false); }
    //   return done(null, user);
    // });
  }
));

app.use('/api/authorization', authorizationRouter);
app.use('/api', passport.authenticate('local'), quizRouter);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
