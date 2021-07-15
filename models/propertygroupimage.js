'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PropertyGroupImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PropertyGroupImage.belongsTo(models.PropertyGroup);
      // define association here
    }
  }
  PropertyGroupImage.init(
    {
      imageUrl: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'PropertyGroupImage',
      underscored: true
    }
  );
  return PropertyGroupImage;
};
