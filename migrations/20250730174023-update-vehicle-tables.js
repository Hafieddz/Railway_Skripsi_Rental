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
      // await queryInterface.bulkDelete("Cars", null, { transaction });
      // await queryInterface.bulkDelete("Motorcycles", null, { transaction });
      // await queryInterface.bulkDelete("Vehicles", null, { transaction });
      await queryInterface.addColumn(
        "Vehicles",
        "name",
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "Vehicles",
        "brand",
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "Vehicles",
        "color",
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "Vehicles",
        "image_url",
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "Vehicles",
        "license_plate",
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "Vehicles",
        "details",
        {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "Vehicles",
        "condition_description",
        {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "Vehicles",
        "price_per_day",
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "Vehicles",
        "manufacture_year",
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        { transaction }
      );
      await queryInterface.removeColumn("Cars", "name", { transaction });
      await queryInterface.removeColumn("Cars", "is_available", {
        transaction,
      });
      await queryInterface.removeColumn("Cars", "brand", { transaction });
      await queryInterface.removeColumn("Cars", "license_plate", {
        transaction,
      });
      await queryInterface.removeColumn("Cars", "manufacture_year", {
        transaction,
      });
      await queryInterface.removeColumn("Cars", "color", { transaction });
      await queryInterface.removeColumn("Cars", "image_url", {
        transaction,
      });
      await queryInterface.removeColumn("Cars", "price_per_day", {
        transaction,
      });
      await queryInterface.removeColumn("Motorcycles", "is_available", {
        transaction,
      });
      await queryInterface.removeColumn("Cars", "condition_description", {
        transaction,
      });
      await queryInterface.removeColumn("Cars", "details", { transaction });
      await queryInterface.removeColumn("Motorcycles", "name", {
        transaction,
      });
      await queryInterface.removeColumn("Motorcycles", "brand", {
        transaction,
      });
      await queryInterface.removeColumn("Motorcycles", "license_plate", {
        transaction,
      });
      await queryInterface.removeColumn("Motorcycles", "manufacture_year", {
        transaction,
      });
      await queryInterface.removeColumn("Motorcycles", "color", {
        transaction,
      });
      await queryInterface.removeColumn("Motorcycles", "image_url", {
        transaction,
      });
      await queryInterface.removeColumn("Motorcycles", "price_per_day", {
        transaction,
      });
      await queryInterface.removeColumn(
        "Motorcycles",
        "condition_description",
        {
          transaction,
        }
      );
      await queryInterface.removeColumn("Motorcycles", "details", {
        transaction,
      });
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(
        "Cars",
        "name",
        { type: Sequelize.STRING, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Cars",
        "brand",
        { type: Sequelize.STRING, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Cars",
        "is_available",
        { type: Sequelize.BOOLEAN, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Motorcycles",
        "is_available",
        { type: Sequelize.BOOLEAN, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Cars",
        "license_plate",
        { type: Sequelize.STRING, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Cars",
        "manufacture_year",
        { type: Sequelize.INTEGER, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Cars",
        "color",
        { type: Sequelize.STRING, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Cars",
        "image_url",
        { type: Sequelize.STRING, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Cars",
        "price_per_day",
        { type: Sequelize.INTEGER, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Cars",
        "condition_description",
        { type: Sequelize.TEXT, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Cars",
        "details",
        { type: Sequelize.TEXT, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Motorcycles",
        "name",
        { type: Sequelize.STRING, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Motorcycles",
        "brand",
        { type: Sequelize.STRING, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Motorcycles",
        "license_plate",
        { type: Sequelize.STRING, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Motorcycles",
        "manufacture_year",
        { type: Sequelize.INTEGER, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Motorcycles",
        "color",
        { type: Sequelize.STRING, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Motorcycles",
        "image_url",
        { type: Sequelize.STRING, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Motorcycles",
        "price_per_day",
        { type: Sequelize.INTEGER, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Motorcycles",
        "condition_description",
        { type: Sequelize.TEXT, allowNull: false },
        { transaction }
      );
      await queryInterface.addColumn(
        "Motorcycles",
        "details",
        { type: Sequelize.TEXT, allowNull: false },
        { transaction }
      );
      await queryInterface.removeColumn("Vehicles", "name", { transaction });
      await queryInterface.removeColumn("Vehicles", "brand", { transaction });
      await queryInterface.removeColumn("Vehicles", "color", { transaction });
      await queryInterface.removeColumn("Vehicles", "image_url", {
        transaction,
      });
      await queryInterface.removeColumn("Vehicles", "license_plate", {
        transaction,
      });
      await queryInterface.removeColumn("Vehicles", "details", { transaction });
      await queryInterface.removeColumn("Vehicles", "condition_description", {
        transaction,
      });
      await queryInterface.removeColumn("Vehicles", "price_per_day", {
        transaction,
      });
      await queryInterface.removeColumn("Vehicles", "manufacture_year", {
        transaction,
      });
    });
  },
};
