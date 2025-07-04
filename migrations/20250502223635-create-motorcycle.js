"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Motorcycles", {
      motorcycle_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      vehicle_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: "Vehicles",
          key: "vehicle_id",
        },
        onDelete: "CASCADE",
      },
      license_plate: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      details: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      manufacture_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      transmission_type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ["Automatic", "Manual"],
      },
      price_per_day: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      is_available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Motorcycles");
  },
};
