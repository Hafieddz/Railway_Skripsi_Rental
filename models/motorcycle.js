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
      license_plate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fuel_type: {
        type: DataTypes.ENUM,
        values: ["Pertamax", "Pertalite", "Pertamax Turbo"],
        allowNull: false,
        defaultValue: "Pertamax",
      },
      condition_description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue:
          "Jelaskan kondisi aktual kendaraan ini secara spesifik. Sebutkan kelebihan utamanya (misal: sangat irit, AC dingin sekali, ban baru) dan jika ada, catatan atau kekurangan minor yang perlu diketahui penyewa (misal: goresan halus di bumper belakang).",
      },
      manufacture_year: { type: DataTypes.INTEGER, allowNull: false },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transmission_type: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Automatic", "Manual"],
      },
      price_per_day: { type: DataTypes.INTEGER, allowNull: false },
      is_available: { type: DataTypes.BOOLEAN, allowNull: false },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
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
