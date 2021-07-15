'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SaleAgent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SaleAgent.belongsToMany(models.Property, {
        through: 'property_sale_agent'
      });
      // define association here
    }
  }
  SaleAgent.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phone: DataTypes.STRING,
      secondaryPhone: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      imageUrl: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true
        }
      },
      // hireDate: {
      //   type: DataTypes.DATE,
      //   allowNull: true,
      //   validate: {
      //     isDate: true
      //   }
      // },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      level: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['Intern', 'Junior', 'Senior']]
        }
      }
    },
    {
      sequelize,
      modelName: 'SaleAgent',
      underscored: true
    }
  );
  return SaleAgent;
};
