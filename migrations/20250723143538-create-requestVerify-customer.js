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
    await queryInterface.addColumn("Customers", "verification_status", {
      type: Sequelize.ENUM,
      values: ["Pending", "Verified", "Not Verified"],
      allowNull: false,
      defaultValue: "Not Verified",
    });

    await queryInterface.removeColumn("Customers", "is_verified");
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn("Customers", "is_verified", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.removeColumn("Customers", "verification_status");
  },
};
