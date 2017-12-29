const express = require('express');
const morgan = require('morgan');
const path = require('path');
var _ = require('lodash'); 
var bodyParser = require('body-parser');
var passport = require("passport");
var BearerStrategy = require("passport-http-bearer").Strategy;
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');

var quizRouter = require('./routes/quiz');
var editorRouter = require('./routes/editor');
var models = require('../models'); 
var cfg = require("../server/config.js");

const app = express();

passport.use(new BearerStrategy(function (token, done) {
  models.users_full.findOne({ where: { token: token } })
  .then(function(user) {
    if(!user || !user.dataValues) return done(null, false);
    if (!user.dataValues.token) return done(null, false);
    jwt.verify(user.dataValues.token, cfg.jwtSecret, function (err, decoded) {
      if (err) {
        console.log(err);
        return done('Failed to authenticate token');
      } 
      done(null, user.dataValues);
    });
  })
  .catch(function(err) {
    console.log('Err: ', err);
    done(err);
  })
}));

passport.use(new LocalStrategy(function (username, password, done) {
  models.users_full.findOne({ where: { username: username } })
    .then(function (user) {
      console.log(user instanceof models.users_full);
      if (!user) return done(null, false);
      user.verifyPassword(password)
        .then(function (verified) {
          if (verified) {
            user.setToken()
            .then(function({err, user}){
              if(err) return done(err);
              done(null, user.dataValues);
            });
          } else {
            done(null, false);
          }
        })
        .catch(function (err) {
          console.log(err);
          done(err);
        })
    })
    .catch(function (err) {
      console.log(err);
      done(err);
    });
}));

passport.serializeUser(function (user, done) {
  done(null, user.token);
});

passport.deserializeUser(function (username, done) {
  models.users_full.findOne({ where: { token: username } })
    .then(function (user) {
      done(null, user.dataValues);
    })
    .catch(function (err) {
      done(err);
    });
});

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/login', function (req, res, next) {
  res.json({ err: 'Incorrect username or password' });
});

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.json({ token: req.user.token });
  }
);

app.get('/logout', function (req, res) {
  req.logout();
  res.end();
});

app.post('/signup', function(req, res) {
  if(!req.body.username || !req.body.password) {
    return res.json({ err: 'Username and password required' });
  }
  models.users_full.create({
    username: req.body.username,
    password: req.body.password
  }).then(function (newUser) {
    if(!newUser) return res.json(500, { err: 'User was not created' });
    newUser.setToken()
      .then(function ({ err, user }) {
        if (err) return done(err);
        res.json(user.dataValues);
      })
      .catch(function(err) {
        res.json({ err: 'Error setting token for new user' });
      })
  }).catch(function (e) {
    console.log(e);
    if (e.message === 'Validation error') {
      return res.json(500, {err: 'Error: Username already taken' });
    }
    res.json(500, { err: 'Error creating user' });
  });
})

app.use('/api', 
  passport.authenticate('bearer', { failureRedirect: '/login' }),
  quizRouter
);

var ensureAdmin = function (req, res, next) {
  if (req.user.role === 'admin') {
    return next();
  }
  res.status(401).json({ err: 'user must be an admin to access editing pages' });
}

app.use('/editor',
  passport.authenticate('bearer', { failureRedirect: '/login' }),
  ensureAdmin,
  editorRouter
);

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
