const express = require('express');
const morgan = require('morgan');
const path = require('path');
var _ = require('lodash'); 
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require("express-session");
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

var quizRouter = require('./routes/quiz');
var authorizationRouter = require('./routes/authorization');
var models = require('../models');

const app = express();

passport.use(new LocalStrategy(
  function (username, password, done) {
    models.users_full.findOne({ where: { username: username } })
      .then(function (user) {
        console.log(user instanceof models.users_full);
        if (!user) return done(null, false);
        user.verifyPassword(password)
          .then(function (res) {
            if (!res) return done(null, false);
            done(null, user.dataValues);
          })
          .catch(function (err) {
            console.log(err);
            done(err);
          })
      })
      .catch(function (err) {
        done(err);
      });
  }
));

passport.serializeUser(function (username, done) {
  done(null, username.username);
});

passport.deserializeUser(function (username, done) {
  models.users_full.findOne({ where: { username: username } })
    .then(function (user) {
      done(null, user.dataValues);
    })
    .catch(function(err) {
      done(err);
    });
});

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ 
  secret: 'keyboard cat', 
  resave: false, 
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/login',
  function (req, res, next) {
    next();
  });

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.json({token: true, loggedIn: true});
  }
);

app.get('/logout',
  function (req, res) {
    req.logout();
    res.redirect('/');
  }
);

var checkLogin = function (req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    if (req.session) {
      req.session.returnTo = req.originalUrl || req.url;
    }
    return res.status(401).json({loggedIn: false, message: 'Not authorized'});
  }
  next();
}

app.use('/api/authorization', authorizationRouter);
app.use('/api', checkLogin,
  quizRouter
);

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
