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

module.exports = router;