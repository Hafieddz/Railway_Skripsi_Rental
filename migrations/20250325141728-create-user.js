"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      auth_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Auths",
          key: "auth_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      gender: {
        type: Sequelize.ENUM,
        values: ["Male", "Female"],
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        values: ["Admin", "Customer"],
        defaultValue: "Customer",
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
