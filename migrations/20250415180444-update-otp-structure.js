"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("OTPs", "hashed_password", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("OTPs", "firstname", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("OTPs", "lastname", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("OTPs", "gender", {
      type: Sequelize.ENUM,
      values: ["Male", "Female"],
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("OTPs", "hashed_password");
    await queryInterface.removeColumn("OTPs", "firstname");
    await queryInterface.removeColumn("OTPs", "lastname");
    await queryInterface.removeColumn("OTPs", "gender");
  },
};
