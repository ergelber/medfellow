const express = require('express');
const Sequelize = require('sequelize');
const _ = require('lodash');
const crypto = require('crypto');

const models = require('../../models');

const router = express.Router();

router.route('/create').post(function (req, res) {
  console.log('REQ: ', req.session);
  models.users_full.create({
    username: req.body.username,
    password: req.body.password
  }).then(function(user) {
    delete user.password;
    delete user.salt;
    req.session.user = user;
    res.send(user);
  }).catch(function(e) {
    console.log(e);
    if (e.message === 'Validation error') {
      return res.send('Error: Username already taken');
    }
    res.send('Error');
  });
});

router.route('/login').post(function (req, res) {
  console.log('REQ: ', req.session.user);
  if(req.session && res.session.user) {
    models.users_full.findOne({ where: { username: req.session.user.username } })
      .then(function (user) {
        res.send(user);
      }).catch(function (e) {
        console.log(e);
        res.send('Error fetching user');
      });
  } else {
    models.users_full.findOne({ where: { username: req.body.username }})
      .then(function (user) {
        req.user = user;
        res.send(user);
      }).catch(function (e) {
        console.log(e);
        res.send('Username does not exist');
        // if (e.message === 'Validation error') {
        //   return res.send('Error: Username already taken');
        // }
        // res.send('Error');
      });
  }
});

module.exports = router;