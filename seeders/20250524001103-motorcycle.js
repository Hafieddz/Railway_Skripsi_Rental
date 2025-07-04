"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    const vehicles = await queryInterface.sequelize.query(
      `SELECT vehicle_id FROM "Vehicles" WHERE vehicle_type = 'Motorcycle';`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const motorcycles = [
      {
        motorcycle_id: uuidv4(),
        vehicle_id: vehicles[0].vehicle_id, // Menggunakan vehicle_id dari Vehicle
        license_plate: "B 1234 ABC",
        name: "Yamaha NMAX",
        brand: "Yamaha",
        details: "Skuter matic 155cc",
        manufacture_year: 2022,
        color: "Hitam",
        transmission_type: "Automatic",
        price_per_day: 75000,
        is_available: true,
        image_url: "https://example.com/nmax.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        motorcycle_id: uuidv4(),
        vehicle_id: vehicles[1].vehicle_id, // Menggunakan vehicle_id dari Vehicle
        license_plate: "D 5678 EFG",
        name: "Honda CBR150R",
        brand: "Honda",
        details: "Motor sport 150cc",
        manufacture_year: 2023,
        color: "Merah",
        transmission_type: "Manual",
        price_per_day: 100000,
        is_available: true,
        image_url: "https://example.com/cbr150r.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Motorcycles", motorcycles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Motorcycles", null, {});
  },
};
