"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      booking_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      vehicle_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Vehicles",
          key: "vehicle_id",
        },
      },
      return_id: {
        type: Sequelize.UUID,
      },
      payment_id: {
        type: Sequelize.UUID,
        references: {
          model: "Payments",
          key: "payment_id",
        },
      },
      booking_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      return_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ["Pending", "Paid", "Expired", "Active", "Completed"],
      },
      total_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      payment_expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      is_payment_almost_expired_notified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Bookings");
  },
};
