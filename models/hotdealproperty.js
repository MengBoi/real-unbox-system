'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HotDealProperty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HotDealProperty.belongsTo(models.Property, {
        as: 'property',
        foreignKey: 'propertyId'
      });
      // define association here
    }
  }
  HotDealProperty.init(
    {
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'HotDealProperty',
      underscored: true
    }
  );
  return HotDealProperty;
};
