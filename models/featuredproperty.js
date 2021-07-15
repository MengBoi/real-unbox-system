'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeaturedProperty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FeaturedProperty.belongsTo(models.Property, {
        as: 'property',
        foreignKey: 'propertyId'
      });
    }
  }
  FeaturedProperty.init(
    {
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'FeaturedProperty',
      underscored: true
    }
  );
  return FeaturedProperty;
};
