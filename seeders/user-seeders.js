"use strict";
const bcrypt = require("bcrypt");
const { QueryError } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { User, Auth, Customer, Admin } = require("../models");

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
      const password = "12345678";
      const hash_password = bcrypt.hashSync(password, 10);
      const USER_COUNT = 10;

      const auth_id = [
        "c5caf2ea-933f-4b85-824b-1dc7fdec3db2",
        "8f30dd27-35f2-42ba-9eef-ff98c9b6d113",
        "de87800c-93ab-401f-a834-ab5b5b471967",
        "f6b15089-a971-483a-8292-34e441f7eb30",
        "7308812d-30bb-439a-9706-082b118f5f4f",
        "22b6c246-0f6d-4d44-9bd6-5cace6c3510b",
        "2bcf0796-855b-4a87-a935-cf7a801c7522",
        "24aba926-01bc-4ee0-a720-f04236fce6e8",
        "9debd646-6de5-4793-a0fc-24126fae1f19",
        "0513985c-14d6-4e53-8504-ae6cf0f1a733",
      ];
      const user_id = [
        "222acce0-b8c0-4e6c-8d2d-e5cd1c36f246",
        "2f453c20-c1b0-4029-abf8-ccc268f01206",
        "b755c312-66b3-4e32-903e-c179e39ab822",
        "2ebe8ee8-62b0-440e-a2af-7300a75f7274",
        "bb4f38ca-7cd9-4cf8-8be8-d4a5692e2047",
        "63ee39e2-9ba6-430a-8ee9-2c38d327a76b",
        "fd46c29e-7b22-4ee3-9add-980994660fa7",
        "faac40a9-57da-4c0b-8b17-92df316cd82c",
        "fd36838f-9268-406b-b06e-531bbb7119b2",
        "7853b1c7-50b1-4c1c-8bf3-f5e7821dcbe0",
      ];
      const child_id = [
        "b28d5486-f32f-470c-8aa4-27add0d2f639",
        "765f7274-d1ee-4b50-aa1b-845443b64d06",
        "8a9b3b6d-b563-4d45-b9ff-8d98942a7d58",
        "b82c6c01-38ce-464b-b6e2-051a98616a06",
        "3e23fcb2-7c32-4a1d-965b-441f2ea79e85",
        "706a662b-f58a-4093-9ded-1bf7faf893d5",
        "d3450866-e63e-4043-9492-abbd0a67c07e",
        "006d8ca3-6904-440d-b7b8-857ea3afa6b7",
        "76f5f400-f483-4edb-b48b-948c149e11fe",
        "3270ea2e-4c60-40b5-8ab1-41f6e3e689f2",
      ];

      for (let i = 0; i < USER_COUNT; i++) {
        if (i === 0) {
          await Auth.create(
            {
              auth_id: auth_id[i],
              email: "hafieddzz@gmail.com",
              password: hash_password,
            },
            { transaction }
          );
          ("done1");
          await User.create(
            {
              user_id: user_id[i],
              auth_id: auth_id[i],
              firstname: "Owner",
              lastname: "C3 Rental",
              gender: "Male",
              role: "Super Admin",
            },
            { transaction }
          );
          ("done2");
          await Admin.create(
            {
              admin_id: child_id[i],
              user_id: user_id[i],
              status: "Active",
            },
            { transaction }
          );
        } else if (i > 0 && i < 8) {
          (i);
          await Auth.create(
            {
              auth_id: auth_id[i],
              email: `hasmy4${i}@gmail.com`,
              password: hash_password,
            },
            { transaction }
          );
          ("done4");
          await User.create(
            {
              user_id: user_id[i],
              auth_id: auth_id[i],
              firstname: "Customer",
              lastname: `${user_id[i]}`,
              gender: "Male",
              role: "Customer",
            },
            { transaction }
          );
          ("done5");
          await Customer.create(
            {
              customer_id: child_id[i],
              user_id: user_id[i],
            },
            { transaction }
          );
        } else {
          (`done${i}`);
          await Auth.create(
            {
              auth_id: auth_id[i],
              email: `admin${i}@gmail.com`,
              password: hash_password,
            },
            { transaction }
          );
          ("done");
          await User.create(
            {
              user_id: user_id[i],
              auth_id: auth_id[i],
              firstname: "Admin",
              lastname: `Number-${i}`,
              gender: "Male",
              role: "Admin",
            },
            { transaction }
          );
          ("done");
          await Admin.create(
            {
              admin_id: child_id[i],
              user_id: user_id[i],
              status: "Active",
            },
            { transaction }
          );
        }
      }
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete("Admins", null, { transaction: t });
      await queryInterface.bulkDelete("Customers", null, { transaction: t });
      await queryInterface.bulkDelete("Users", null, { transaction: t });
      await queryInterface.bulkDelete("Auths", null, { transaction: t });
    });
  },
};
