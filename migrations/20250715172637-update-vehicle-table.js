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
    await queryInterface.addColumn("Cars", "fuel_type", {
      type: Sequelize.ENUM,
      values: [
        "Pertamax",
        "Pertalite",
        "Pertamax Turbo",
        "Dexlite",
        "Pertamina Dex",
      ],
      allowNull: false,
      defaultValue: "Pertamax",
    });
    await queryInterface.addColumn("Cars", "features", {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    });
    await queryInterface.addColumn("Motorcycles", "fuel_type", {
      type: Sequelize.ENUM,
      values: ["Pertamax", "Pertalite", "Pertamax Turbo"],
      allowNull: false,
      defaultValue: "Pertamax",
    });
    await queryInterface.addColumn("Cars", "baggage_capacity", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 2,
    });
    await queryInterface.addColumn("Cars", "condition_description", {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue:
        "Jelaskan kondisi aktual kendaraan ini secara spesifik. Sebutkan kelebihan utamanya (misal: sangat irit, AC dingin sekali, ban baru) dan jika ada, catatan atau kekurangan minor yang perlu diketahui penyewa (misal: goresan halus di bumper belakang).",
    });
    await queryInterface.addColumn("Motorcycles", "condition_description", {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue:
        "Jelaskan kondisi aktual kendaraan ini secara spesifik. Sebutkan kelebihan utamanya (misal: sangat irit, AC dingin sekali, ban baru) dan jika ada, catatan atau kekurangan minor yang perlu diketahui penyewa (misal: goresan halus di bumper belakang).",
    });


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Cars", "fuel_type");
    await queryInterface.removeColumn("Cars", "features");
    await queryInterface.removeColumn("Cars", "baggage_capacity");
    await queryInterface.removeColumn("Cars", "condition_description");
    await queryInterface.removeColumn("Motorcycles", "fuel_type");
  },
};
