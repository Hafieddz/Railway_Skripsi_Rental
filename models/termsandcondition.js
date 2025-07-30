"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TermsAndCondition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TermsAndCondition.init(
    {
      tnc_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.JSONB,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "TermsAndCondition",
      timestamps: false,
    }
  );
  return TermsAndCondition;
};
