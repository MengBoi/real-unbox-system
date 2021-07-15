'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PropertyGroupType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PropertyGroupType.hasMany(models.PropertyGroup, {
        as: 'propertyGroups',
        foreignKey: 'propertyGroupTypeId'
      });

      PropertyGroupType.belongsTo(models.MainPropertyGroupType, {
        as: 'mainPropertyGroupType',
        foreignKey: 'mainPropertyGroupTypeId'
      });
      // define association here
    }
  }
  PropertyGroupType.init(
    {
      title: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'PropertyGroupType',
      underscored: true
    }
  );
  return PropertyGroupType;
};
