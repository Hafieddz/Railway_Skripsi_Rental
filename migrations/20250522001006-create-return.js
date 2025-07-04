"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ReturnRecords", {
      return_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      return_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      late_days: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      late_fee: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW(),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ReturnRecords");
  },
};
