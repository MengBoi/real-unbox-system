'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Zone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Zone.belongsTo(models.City, {
        as: 'city',
        foreignKey: 'cityId'
      });

      Zone.hasMany(models.Address, {
        as: 'addresses',
        foreignKey: 'zoneId'
      });
      // define association here
    }
  }
  Zone.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Zone',
      underscored: true
    }
  );
  return Zone;
};
