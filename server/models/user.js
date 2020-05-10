'use strict';

const bcrypt = require('bcrypt')
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model { }

  User.init({
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'First name should not empty'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Last name should not empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email should not empty'
        },
        isEmail: {
          msg: 'Not email form type'
        },
      },
      unique: {
        msg: 'Email already in use'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password should not empty'
        }
      }
    }
  }, { sequelize });

  User.beforeCreate((user, options) => {
    const hash = bcrypt.hashSync(user.password, saltRounds);
    user.password = hash
  })
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Favorite)
  };
  return User;
};