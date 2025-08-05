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
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn("Customers", "firstname", {
        transaction,
      });
      await queryInterface.removeColumn("Customers", "lastname", {
        transaction,
      });
      await queryInterface.removeColumn("Admins", "firstname", {
        transaction,
      });
      await queryInterface.removeColumn("Admins", "lastname", {
        transaction,
      });
      await queryInterface.removeColumn("Customers", "id_number", {
        transaction,
      });
      await queryInterface.removeColumn("Customers", "id_image", {
        transaction,
      });
      await queryInterface.removeColumn("OTPs", "firstname", {
        transaction,
      });
      await queryInterface.removeColumn("OTPs", "lastname", {
        transaction,
      });
      await queryInterface.removeColumn("OTPs", "gender", {
        transaction,
      });
      await queryInterface.addColumn(
        "Users",
        "firstname",
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        {
          transaction,
        }
      );
      await queryInterface.addColumn(
        "Users",
        "lastname",
        {
          type: Sequelize.STRING,
        },
        {
          transaction,
        }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize(async (transaction) => {
      await queryInterface.removeColumn("Users", "lastname", { transaction });
      await queryInterface.removeColumn("Users", "firstname", { transaction });
      await queryInterface.addColumn(
        "OTPs",
        "gender",
        {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ["Female", "Male"],
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "OTPs",
        "lastname",
        {
          type: Sequelize.STRING,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "OTPs",
        "firstname",
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "Admins",
        "lastname",
        {
          type: Sequelize.STRING,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "Admins",
        "firstname",
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "Customers",
        "id_image",
        {
          type: Sequelize.STRING,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "Customers",
        "id_number",
        {
          type: Sequelize.STRING,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "Customers",
        "lastname",
        {
          type: Sequelize.STRING,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "Customers",
        "firstname",
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      );
    });
  },
};
