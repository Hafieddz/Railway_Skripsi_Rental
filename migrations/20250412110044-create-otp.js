"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OTPs", {
      otp_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      otp_code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      expires_at: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["Used", "Pending", "Expired"],
        defaultValue: "Pending",
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("OTPs");
  },
};
