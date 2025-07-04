"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.sequelize.transaction(async (transaction) => {
      const auth_id = uuidv4();
      const user_id = uuidv4();
      await queryInterface.bulkInsert(
        "Auths",
        [
          {
            auth_id,
            email: "hafieddzz@gmail.com",
            password: await bcrypt.hash("12345678", 10),
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction }
      );
      await queryInterface.bulkInsert(
        "Users",
        [
          {
            user_id,
            auth_id,
            role: "Super Admin",
            gender: "Male",
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction }
      );
      await queryInterface.bulkInsert(
        "Admins",
        [
          {
            admin_id: uuidv4(),
            user_id,
            firstname: "Hafiedz",
            lastname: "Hasmy Hamid",
            status: "Active",
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
