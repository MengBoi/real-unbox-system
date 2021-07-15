'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Country.hasMany(models.City, {
        as: 'cities',
        foreignKey: 'countryId'
      });
      // define association here
    }
  }
  Country.init(
    {
      name: DataTypes.STRING,
      countryCode: { type: DataTypes.STRING, allowNull: true },
      phoneCode: { type: DataTypes.STRING, allowNull: true },
      languageCode: { type: DataTypes.STRING, allowNull: true }
    },
    {
      sequelize,
      modelName: 'Country',
      underscored: true
    }
  );
  return Country;
};
