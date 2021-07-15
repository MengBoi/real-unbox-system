"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.hasOne(models.PropertyGroup, {
        as: "propertyGroup",
        foreignKey: "addressId",
      });
      Address.belongsTo(models.Zone, {
        as: "zone",
        foreignKey: "zoneId",
      });
      // define association here
    }
  }
  Address.init(
    {
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      addressName: DataTypes.STRING,
      streetNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      landmark: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Address",
      underscored: true,
    }
  );
  return Address;
};
