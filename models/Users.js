const bcrypt = require('bcrypt');
const Promise = require("bluebird");
const jwt = require('jsonwebtoken');

var cfg = require("../server/config.js");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('users_full', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING
    },
    token: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM,
      values: [ 'admin', 'user' ]
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
    hooks: {
      beforeCreate: function (user, options) {
        return cryptPassword(user.password)
          .then(({ hash, salt }) => {
            console.log('*****SALT: ', salt)
            user.salt = salt;
            user.password = hash;
          })
          .catch((err) => {
            if (err) console.log(err);
          });
      }
    }
  });

  User.prototype.verifyPassword = function(password) {
   return bcrypt.compare(password, this.dataValues.password).then(function (res) {
      console.log('RES', res);
      return res;
    });
  }

  User.prototype.setToken = function() {
    var payload = {
      id: this.username
    };
    this.token = jwt.sign(payload, cfg.jwtSecret);
    return this.save()
      .then(function(user) {
        return { user: user };
      })
      .catch(function(err) {
        console.log(err);
        return { err: err };
      })
  }
  return User;
}

function cryptPassword(password) {
  console.log("cryptPassword" + password);
  return new Promise(function (resolve, reject) {
    bcrypt.genSalt(10, function (err, salt) {
      // Encrypt password using bycrpt module
      if (err) return reject(err);
      bcrypt.hash(password, salt).then(function(hash, err) {
        return resolve({ hash: hash, salt: salt });
      });
    });
  });
}

