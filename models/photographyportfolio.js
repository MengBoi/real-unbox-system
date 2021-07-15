'use strict';
const { Model } = require('sequelize');
const {
  PORTFOLIO_TYPES_ARCHITECTURAL,
  PORTFOLIO_TYPES_ARIEL,
  PORTFOLIO_TYPES_EXTERIOR,
  PORTFOLIO_TYPES_INTERIOR
} = require('../utils/constants');
module.exports = (sequelize, DataTypes) => {
  class PhotographyPortfolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PhotographyPortfolio.init(
    {
      imageUrl: DataTypes.STRING,
      type: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isIn: [
            [
              PORTFOLIO_TYPES_EXTERIOR,
              PORTFOLIO_TYPES_INTERIOR,
              PORTFOLIO_TYPES_ARCHITECTURAL,
              PORTFOLIO_TYPES_ARIEL
            ]
          ]
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      underscored: true,
      modelName: 'PhotographyPortfolio'
    }
  );
  return PhotographyPortfolio;
};
