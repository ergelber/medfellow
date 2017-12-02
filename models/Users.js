const bcrypt = require('bcrypt');
const Promise = require("bluebird");

module.exports = function (sequelize, DataTypes) {
  const Users = sequelize.define('users_full', {
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
    },
    instanceMethods: {
      verifyPassword: function(user, password) {
        bcrypt.compare(password, user.password).then(function (res) {
          console.log('RES', res);
          return res;
        });
      }
    }
  });

  return Users;
}

function cryptPassword(password) {
  console.log("cryptPassword" + password);
  return new Promise(function (resolve, reject) {
    bcrypt.genSalt(10, function (err, salt) {
      console.log('SALT: ', salt)
      // Encrypt password using bycrpt module
      if (err) return reject(err);

      bcrypt.hash(password, salt).then(function(hash, err) {
        console.log('HASH: ', hash)
        return resolve({ hash: hash, salt: salt });
      });
    });
  });
}

