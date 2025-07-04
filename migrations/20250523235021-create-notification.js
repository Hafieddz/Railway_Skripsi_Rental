"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Notifications", {
      notification_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      booking_id: {
        type: Sequelize.UUID,
        references: {
          model: "Bookings",
          key: "booking_id",
        },
      },
      payment_id: {
        type: Sequelize.UUID,
        references: {
          model: "Payments",
          key: "payment_id",
        },
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "user_id",
        },
      },
      is_read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      notification_details: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("Notifications");
  },
};
