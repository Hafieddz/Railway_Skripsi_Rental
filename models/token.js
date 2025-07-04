"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Token.init(
    {
      jti: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      email: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.ENUM, values: ["Used", "Pending", "Expired"] },
      used_for: { type: DataTypes.STRING, allowNull: false },
      expires_at: DataTypes.DATE,
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      modelName: "Token",
      timestamps: false,
    }
  );
  return Token;
};
