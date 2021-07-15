"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Property.belongsTo(models.PropertyGroup, {
        as: "propertyGroup",
        foreignKey: "propertyGroupId",
      });

      Property.hasMany(models.PropertyImage, {
        as: "propertyImages",
        foreignKey: "propertyId",
      });

      Property.belongsToMany(models.SaleAgent, {
        through: "property_saleagent",
      });

      Property.hasOne(models.FeaturedProperty, {
        as: "featuredProperty",
        foreignKey: "propertyId",
      });

      Property.hasOne(models.HotDealProperty, {
        as: "hotDealProperty",
        foreignKey: "propertyId",
      });
    }
  }

  Property.init(
    {
      dealType: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isIn: ["sale", "rent"],
        },
      },
      grossArea: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      netArea: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      orientation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      unitPrice: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      totalPrice: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      numberOfBedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numberOfLivingrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numberOfBathrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numberOfKitchens: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      floor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      remark: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      promotionTitle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      promotionDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      videoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      isFeatured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isHotDeal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Property",
      underscored: true,
    }
  );
  return Property;
};
