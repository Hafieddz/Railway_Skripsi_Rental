"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Motorcycle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Motorcycle.belongsTo(models.Vehicle, {
        foreignKey: "vehicle_id",
        as: "motorcycle_data",
      });
    }
  }
  Motorcycle.init(
    {
      motorcycle_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      vehicle_id: {
        type: DataTypes.UUID,
        unique: true,
      },
      fuel_type: {
        type: DataTypes.ENUM,
        values: ["Pertamax", "Pertalite", "Pertamax Turbo"],
        allowNull: false,
        defaultValue: "Pertamax",
      },
      transmission_type: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Automatic", "Manual"],
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Motorcycle",
      timestamps: false,
    }
  );
  return Motorcycle;
};
