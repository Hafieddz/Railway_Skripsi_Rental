"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Customers", {
      customer_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      id_number: {
        type: Sequelize.INTEGER,
      },
      id_image: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8],
            msg: "Minimal 8 Karakter",
          },
          notEmpty: {
            msg: "Nomor telepon tidak boleh kosong",
          },
          isNumeric: {
            msg: "Harus berupa angka",
          },
        },
      },
      address: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        default: Sequelize.NOW,
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Customers");
  },
};
