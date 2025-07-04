"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    const vehicles = [
      {
        vehicle_id: uuidv4(),
        vehicle_type: "Motorcycle",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        vehicle_id: uuidv4(),
        vehicle_type: "Car",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        vehicle_id: uuidv4(),
        vehicle_type: "Motorcycle",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        vehicle_id: uuidv4(),
        vehicle_type: "Car",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Vehicles", vehicles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Vehicles", null, {});
  },
};
