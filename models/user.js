'use strict';
const { Model } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static getHashedPassword = async password => {
      const salt = await bcrypt.genSalt(10);
      const hasedPassword = await bcrypt.hash(password, salt);
      return hasedPassword;
    };

    static getSignedJwtToken = userId => {
      return jwt.sign({ id: userId }, process.env.JWT_SECRET);
    };

    static matchedPassword = async (enteredPassword, password) => {
      return await bcrypt.compare(enteredPassword, password);
    };
  }

  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Username is already taken'
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
        validate: {
          isIn: [['admin', 'user']]
        },
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true
    }
  );

  return User;
};
