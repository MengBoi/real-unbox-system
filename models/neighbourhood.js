'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Neighbourhood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // const PropertyGroupNeighbourhood = sequelize.define(
      //   'propertygroup_neighbourhood',
      //   {
      //     item: DataTypes.STRING
      //   },
      //   {
      //     underscored: true
      //   }
      // );

      Neighbourhood.belongsTo(models.PropertyGroup, {
        as: 'propertyGroup',
        foreignKey: 'propertyGroupId'
      });

      Neighbourhood.hasMany(models.NeighbourhoodItem, {
        as: 'neighbourhoodItems',
        foreignKey: 'neighbourhoodId'
      });
      // define association here
    }
  }
  Neighbourhood.init(
    {
      title: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Neighbourhood',
      underscored: true
    }
  );
  return Neighbourhood;
};
