'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PropertyImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PropertyImage.belongsTo(models.Property, {
        as: 'property',
        foreignKey: 'propertyId'
      });
      // define association here
    }
  }
  PropertyImage.init(
    {
      imageUrl: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'PropertyImage',
      underscored: true
    }
  );
  return PropertyImage;
};
