"use strict";

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
      await queryInterface.bulkDelete("Notifications", null, { transaction });
      await queryInterface.bulkDelete("Bookings", null, { transaction });
      await queryInterface.bulkDelete("Payments", null, { transaction });
      await queryInterface.bulkDelete("VehicleAvailabilities", null, {
        transaction,
      });
      await queryInterface.bulkDelete("Reviews", null, { transaction });
      await queryInterface.bulkDelete("Customers", null, { transaction });
      await queryInterface.bulkDelete("Admins", null, { transaction });
      await queryInterface.bulkDelete("Users", null, { transaction });
      await queryInterface.bulkDelete("OTPs", null, { transaction });
      await queryInterface.bulkDelete("Auths", null, { transaction });
      await queryInterface.bulkDelete("Cars", null, { transaction });
      await queryInterface.bulkDelete("Motorcycles", null, { transaction });
      await queryInterface.bulkDelete("Vehicles", null, { transaction });
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
