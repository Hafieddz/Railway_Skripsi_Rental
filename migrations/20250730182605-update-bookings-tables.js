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
      await queryInterface.removeColumn(
        "Bookings",
        "is_payment_almost_expired_notified",
        {
          transaction,
        }
      );
      await queryInterface.addColumn(
        "Bookings",
        "expires_notified",
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        { transaction }
      );
      await queryInterface.removeColumn("Payments", "payment_method", {
        transaction,
      });
      await queryInterface.removeColumn("Payments", "transaction_id", {
        transaction,
      });
      await queryInterface.addColumn(
        "Payments",
        "booking_id",
        {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "Bookings",
            key: "booking_id",
          },
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "ReturnRecords",
        "booking_id",
        {
          type: Sequelize.UUID,

          references: {
            model: "Bookings",
            key: "booking_id",
          },
        },
        { transaction }
      );
      await queryInterface.removeColumn("Notifications", "is_read", {
        transaction,
      });
      await queryInterface.removeColumn("Bookings", "payment_id", {
        transaction,
      });
      await queryInterface.removeColumn("Bookings", "return_id", {
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
        "Bookings",
        "is_payment_almost_expired_notified",
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        { transaction }
      );
      await queryInterface.removeColumn("Bookings", "expires_notified", {
        transaction,
      });
      await queryInterface.removeColumn("Payments", "booking_id", {
        transaction,
      });
      await queryInterface.addColumn(
        "Payments",
        "payment_method",
        {
          type: Sequelize.ENUM,
          values: ["Cash", "Transfer"],
          allowNull: false,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "Payments",
        "transaction_id",
        {
          type: Sequelize.UUID,
          allowNull: false,
        },
        { transaction }
      );
      await queryInterface.removeColumn("ReturnRecords", "booking_id", {
        transaction,
      });
      await queryInterface.addColumn(
        "Notifications",
        "is_read",
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "Bookings",
        "payment_id",
        {
          type: Sequelize.UUID,
          allowNull: false,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "Bookings",
        "return_id",
        {
          type: Sequelize.UUID,
          allowNull: false,
        },
        { transaction }
      );
    });
  },
};
