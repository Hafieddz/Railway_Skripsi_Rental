"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("VehicleAvailabilities", {
      vehicle_availability_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      vehicle_id: {
        type: Sequelize.UUID,
        references: {
          model: "Vehicles",
          key: "vehicle_id",
        },
      },
      unavailable_start_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      unavailable_end_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["Booked", "Service"],
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("VehicleAvailabilities");
  },
};
