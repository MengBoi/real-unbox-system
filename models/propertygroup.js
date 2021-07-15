"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertyGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PropertyGroup.hasMany(models.Property, {
        as: "properties",
        foreignKey: "propertyGroupId",
      });

      PropertyGroup.hasOne(models.PropertyContact, {
        as: "contact",
        foreignKey: "propertyGroupId",
      });

      PropertyGroup.belongsTo(models.PropertyGroupType, {
        foreignKey: "propertyGroupTypeId",
        as: "propertyGroupType",
      });

      PropertyGroup.hasMany(models.PropertyGroupImage, {
        as: "propertyGroupImages",
        foreignKey: "propertyGroupId",
      });

      PropertyGroup.belongsTo(models.Address, {
        as: "address",
        foreignKey: "addressId",
      });

      const PropertyGroupNeighbourhood = sequelize.define(
        "propertygroup_neighbourhood",
        {
          item: DataTypes.STRING,
        },
        {
          underscored: true,
        }
      );

      PropertyGroup.hasMany(models.Neighbourhood, {
        as: "neighbourhoods",
        foreignKey: "propertyGroupId",
      });

      // define association here
    }
  }
  PropertyGroup.init(
    {
      propertyType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      projectName: DataTypes.STRING,
      developedBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      managedBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      siteArea: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      numberOfBuildings: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      numberOfFloors: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      numberOfUnits: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      buildingHeight: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      constructionStartDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      constructionEndDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      roomPerFloor: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      parkingLevel: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      parkingUnit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      indoorFurnishing: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isIn: ["Fully Decoration", "Fully Furnished", "No Furnitures"],
        },
      },
      serviceLifts: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fireExitsPerFloor: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      petFriendly: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      internet: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      security: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      cctv: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      moreAmenities: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      swimmingPool: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      fitnessCenter: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      steamSauna: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      cafeteria: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      moreFacilities: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      averagePrice: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      startingPrice: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      downPayment: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      installment: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      loanTerm: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      financingDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Cambodia",
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Cambodia",
      },
      zone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zoneIdentifier: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "PropertyGroup",
      underscored: true,
    }
  );
  return PropertyGroup;
};
