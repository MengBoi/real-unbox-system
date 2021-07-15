'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PropertyContact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PropertyContact.belongsTo(models.PropertyGroup);

      // define association here
    }
  }
  PropertyContact.init(
    {
      title: DataTypes.STRING,
      name: DataTypes.STRING,
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      secondaryPhone: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      email: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'PropertyContact',
      underscored: true
    }
  );
  return PropertyContact;
};
