"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    const vehicles = await queryInterface.sequelize.query(
      `SELECT vehicle_id FROM "Vehicles" WHERE vehicle_type = 'Car';`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const cars = [
      {
        car_id: uuidv4(),
        vehicle_id: vehicles[0].vehicle_id, // Menggunakan vehicle_id dari Vehicle
        license_plate: "AB 1234 CD",
        name: "Toyota Avanza",
        brand: "Toyota",
        details: "Mobil keluarga 7 penumpang",
        manufacture_year: 2021,
        color: "Silver",
        transmission_type: "Automatic",
        price_per_day: 250000,
        is_available: true,
        type: "MPV",
        passenger_capacity: 7,
        image_url: "51e145cf-0b26-48d7-955d-168ea5499830_removalai_preview.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        car_id: uuidv4(),
        vehicle_id: vehicles[1].vehicle_id, // Menggunakan vehicle_id dari Vehicle
        license_plate: "B 5678 EF",
        name: "Honda Civic",
        brand: "Honda",
        details: "Mobil sedan sporty",
        manufacture_year: 2023,
        color: "Putih",
        transmission_type: "Manual",
        price_per_day: 350000,
        is_available: true,
        type: "Sedan",
        passenger_capacity: 5,
        image_url: "51e145cf-0b26-48d7-955d-168ea5499830_removalai_preview.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Cars", cars, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cars", null, {});
  },
};
