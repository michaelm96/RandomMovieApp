'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Favorite extends Model { }

  Favorite.init({
    movieId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'movieId should not be empty'
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'imageUrl should not be empty'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'status should not be empty'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'UserId should not be empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'description should not be empty'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'title should not be empty'
        }
      }
    },
    released_date: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: 'date should not be empty'
        }
      }
    }
  }, { sequelize });

  Favorite.associate = function (models) {
    // associations can be defined here
    Favorite.belongsTo(models.User)
  };
  return Favorite;
};