"use strict";
const bcrypt = require("bcrypt");
const { QueryError } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { Booking, Payment, ReturnRecord } = require("../models");

const dummy_customer_id = [
  "2ebe8ee8-62b0-440e-a2af-7300a75f7274",
  "2f453c20-c1b0-4029-abf8-ccc268f01206",
  "63ee39e2-9ba6-430a-8ee9-2c38d327a76b",
  "b755c312-66b3-4e32-903e-c179e39ab822",
  "bb4f38ca-7cd9-4cf8-8be8-d4a5692e2047",
  "faac40a9-57da-4c0b-8b17-92df316cd82c",
  "fd46c29e-7b22-4ee3-9add-980994660fa7",
];

const dummy_vehicle_id = [
  "00788f53-5766-41af-9238-d00fd235f703",
  "00fdbbd4-91f6-48d4-9809-aa713bce6e44",
  "055ee1ef-b517-4810-bb56-1140d0eb49ea",
  "05fce81c-7603-45df-845b-9fc42a16b5c6",
  "172e309e-b9c7-4da1-8292-ae1af14c1a17",
  "2e44cfc7-fed4-47ba-929c-91144c5ed6cb",
  "535e25b0-9b38-471a-8cf2-de417228c251",
  "74ff9ae8-aa20-4c4f-a192-0867583ecd82",
  "89625172-09de-4725-8d96-a0124f1c5eb7",
  "8a395d2f-5483-4689-80f9-2743f156b341",
  "92755b5e-64bf-4954-bae7-db0057646542",
  "a59b59ac-8f61-4c2a-a466-4d696e93a4f4",
  "af4c9fd4-3d88-4be5-bcd6-644ad85d62a9",
  "d836c337-beb3-44af-bbb9-9550bdcd4287",
  "f45bc4c8-3cb6-425c-b46a-3d94fa314470",
  "f53de240-a17d-4412-948f-e5838af2473e",
  "fd65567f-ab4b-4242-8a65-405e1d5e4b6a",
];

function getRandomIsoDate() {
  const startDate = new Date("2023-01-01T00:00:00.000Z").getTime();
  const endDate = new Date("2025-07-31T00:00:00.000Z").getTime();

  const randomTimestamp = Math.random() * (endDate - startDate) + startDate;
  const randomDate = new Date(randomTimestamp);

  return randomDate.toISOString();
}

function addDays(rentalDate, duration) {
  const date = new Date(rentalDate);
  date.setDate(date.getDate() + duration);

  return date.toISOString();
}

function addMinutes(rentalDate, duration) {
  const date = new Date(rentalDate);
  date.setMinutes(date.getMinutes() + duration);

  return date.toISOString();
}

function randomTotalPrice(min, max, kelipatan) {
  const minMultiplier = min / kelipatan;
  const maxMultiplier = max / kelipatan;

  const random = Math.floor(
    Math.random() * (maxMultiplier - minMultiplier + 1) + minMultiplier
  );

  return random * kelipatan;
}

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

    await queryInterface.sequelize.transaction(async (transaction) => {
      const TOTAL_BOOKINGS = 100;
      for (let i = 0; i < TOTAL_BOOKINGS; i++) {
        const booking_id = uuidv4();
        const payment_id = uuidv4();
        const return_id = uuidv4();
        const booking_date = getRandomIsoDate();
        const rentalDuration = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        const return_date = addDays(booking_date, rentalDuration);
        const vehicle_id =
          dummy_vehicle_id[Math.floor(Math.random() * (16 - 0 + 1)) + 0];
        const user_id =
          dummy_customer_id[Math.floor(Math.random() * (6 - 0 + 1)) + 0];
        const payment_expires_at = addMinutes(booking_date, 30);
        const total_price = randomTotalPrice(100000, 2000000, 100000);
        if (i < 19) {
          await Booking.create(
            {
              booking_id,
              vehicle_id,
              user_id,
              booking_date,
              return_date,
              status: "Expired",
              total_price,
              rental_duration: rentalDuration,
              payment_expires_at,
            },
            { transaction }
          );
          await Payment.create(
            {
              payment_id,
              user_id,
              booking_id,
              payment_status: "Expired",
              payment_token: uuidv4(),
              total_price,
              payment_date: booking_date,
            },
            { transaction }
          );
        } else {
          await Booking.create(
            {
              booking_id,
              vehicle_id,
              user_id,
              booking_date,
              return_date,
              status: "Active",
              total_price,
              rental_duration: rentalDuration,
              payment_expires_at,
            },
            { transaction }
          );
          await Payment.create(
            {
              payment_id,
              user_id,
              booking_id,
              payment_status: "Paid",
              payment_token: uuidv4(),
              total_price,
              payment_date: booking_date,
            },
            { transaction }
          );
        }
      }
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete("Payments", null, { transaction });
      await queryInterface.bulkDelete("Bookings", null, { transaction });
    });
  },
};
