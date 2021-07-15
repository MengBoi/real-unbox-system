'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MainPropertyGroupType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MainPropertyGroupType.hasMany(models.PropertyGroupType, {
        as: 'propertyGroupTypes',
        foreignKey: 'mainPropertyGroupTypeId'
      });

      // define association here
    }
  }
  MainPropertyGroupType.init(
    {
      title: DataTypes.STRING,
      type: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'MainPropertyGroupType',
      underscored: true
    }
  );
  return MainPropertyGroupType;
};
