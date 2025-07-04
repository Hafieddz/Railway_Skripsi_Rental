"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VehicleAvailability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      VehicleAvailability.belongsTo(models.Vehicle, {
        foreignKey: "vehicle_id",
        as: "vehicle_data",
      });
    }
  }
  VehicleAvailability.init(
    {
      vehicle_availability_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      vehicle_id: {
        type: DataTypes.UUID,
        references: {
          model: "Vehicles",
          key: "vehicle_id",
        },
      },
      unavailable_start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      unavailable_end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["Booked", "Service"],
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "VehicleAvailability",
      timestamps: false,
    }
  );
  return VehicleAvailability;
};
