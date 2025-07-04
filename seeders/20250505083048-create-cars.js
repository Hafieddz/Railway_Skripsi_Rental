"use strict";

const { sequelize } = require("../models");
const vehicle = require("../models/vehicle");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await sequelize.transaction(async (t) => {
      // Buat 10 UUID baru untuk Vehicle dan simpan referensinya
      const vehicleIds = Array.from({ length: 10 }, () => uuidv4());

      // Masukkan ke tabel Vehicles
      await queryInterface.bulkInsert(
        "Vehicles",
        vehicleIds.map((id) => ({
          vehicle_id: id,
          vehicle_type: "Car",
          created_at: new Date(),
          updated_at: new Date(),
        })),
        { transaction: t }
      );

      // Masukkan ke tabel Cars dengan referensi vehicle_id yang sama
      await queryInterface.bulkInsert(
        "Cars",
        [
          {
            license_plate: "B 1234 ABC",
            name: "Avanza G",
            brand: "Toyota",
            details: "1.3L engine, fuel-efficient, family-friendly",
            manufacture_year: 2020,
            color: "Silver",
            transmission_type: "Manual",
            price_per_day: 300000,
            is_available: true,
            type: "MPV",
            passenger_capacity: 7,
            image_url:
              "51e145cf-0b26-48d7-955d-168ea5499830_removalai_preview.png",
          },
          {
            license_plate: "D 5678 DEF",
            name: "Civic RS",
            brand: "Honda",
            details: "1.5L Turbo, sporty design",
            manufacture_year: 2022,
            color: "Red",
            transmission_type: "Automatic",
            price_per_day: 500000,
            is_available: false,
            type: "Sedan",
            passenger_capacity: 5,
            image_url:
              "51e145cf-0b26-48d7-955d-168ea5499830_removalai_preview.png",
          },
          {
            license_plate: "F 9988 GHI",
            name: "Fortuner VRZ",
            brand: "Toyota",
            details: "Diesel, luxury SUV",
            manufacture_year: 2021,
            color: "Black",
            transmission_type: "Automatic",
            price_per_day: 750000,
            is_available: true,
            type: "SUV",
            passenger_capacity: 7,
            image_url:
              "51e145cf-0b26-48d7-955d-168ea5499830_removalai_preview.png",
          },
          {
            license_plate: "B 2121 JKL",
            name: "Xpander Ultimate",
            brand: "Mitsubishi",
            details: "7-seater, premium interior",
            manufacture_year: 2023,
            color: "White",
            transmission_type: "Automatic",
            price_per_day: 400000,
            is_available: true,
            type: "MPV",
            passenger_capacity: 7,
            image_url:
              "51e145cf-0b26-48d7-955d-168ea5499830_removalai_preview.png",
          },
          {
            license_plate: "L 4321 MNO",
            name: "HR-V SE",
            brand: "Honda",
            details: "Stylish crossover, 1.5L engine",
            manufacture_year: 2022,
            color: "Blue",
            transmission_type: "Automatic",
            price_per_day: 550000,
            is_available: false,
            type: "SUV",
            passenger_capacity: 5,
            image_url: "CarPlaceholder",
          },
          {
            license_plate: "B 8765 PQR",
            name: "Alphard",
            brand: "Toyota",
            details: "Luxury MPV, captain seat",
            manufacture_year: 2020,
            color: "Black",
            transmission_type: "Automatic",
            price_per_day: 1200000,
            is_available: true,
            type: "MPV",
            passenger_capacity: 7,
            image_url: "CarPlaceholder",
          },
          {
            license_plate: "B 3412 STU",
            name: "Camry Hybrid",
            brand: "Toyota",
            details: "Hybrid sedan, fuel-efficient",
            manufacture_year: 2021,
            color: "Grey",
            transmission_type: "Automatic",
            price_per_day: 950000,
            is_available: true,
            type: "Sedan",
            passenger_capacity: 5,
            image_url: "CarPlaceholder",
          },
          {
            license_plate: "B 6543 VWX",
            name: "Innova Zenix",
            brand: "Toyota",
            details: "Hybrid MPV, premium features",
            manufacture_year: 2023,
            color: "Beige",
            transmission_type: "Automatic",
            price_per_day: 700000,
            is_available: false,
            type: "MPV",
            passenger_capacity: 7,
            image_url: "CarPlaceholder",
          },
          {
            license_plate: "H 2211 YZA",
            name: "Yaris GR",
            brand: "Toyota",
            details: "Compact sports hatchback",
            manufacture_year: 2022,
            color: "White",
            transmission_type: "Manual",
            price_per_day: 850000,
            is_available: true,
            type: "Sedan",
            passenger_capacity: 5,
            image_url: "CarPlaceholder",
          },
          {
            license_plate: "B 9090 ZZZ",
            name: "Rush TRD",
            brand: "Toyota",
            details: "Compact SUV, 7-seater",
            manufacture_year: 2021,
            color: "Dark Grey",
            transmission_type: "Manual",
            price_per_day: 450000,
            is_available: true,
            type: "SUV",
            passenger_capacity: 7,
            image_url: "CarPlaceholder",
          },
        ].map((car, index) => ({
          ...car,
          car_id: uuidv4(),
          vehicle_id: vehicleIds[index],
          created_at: new Date(),
          updated_at: new Date(),
        })),
        { transaction: t }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
