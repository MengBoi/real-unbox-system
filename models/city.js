'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      City.belongsTo(models.Country, {
        as: 'country',
        foreignKey: 'countryId'
      });

      City.hasMany(models.Zone, {
        as: 'zones',
        foreignKey: 'cityId'
      });
      // define association here
    }
  }
  City.init(
    {
      name: DataTypes.STRING,
      cityCode: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'City',
      underscored: true
    }
  );
  return City;
};
