"use strict";
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
      await queryInterface.bulkInsert(
        "Auth",
        [
          {
            auth_id: "34e4ae0d-51a1-4223-a7d3-a106a9f0caff",
            email: "hafieddz@gmail.com",
            password: await bcrypt.hash("12345678", 10),
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            auth_id: "32e897cf-9352-462a-b2bd-14e1e37c7ad6",
            email: "hasmy41@gmail.com",
            password: await bcrypt.hash("12345678910", 10),
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            auth_id: "f570b737-b396-49b2-848b-02728890af0d",
            email: "facelessvoid@gmail.com",
            password: await bcrypt.hash("dota1234", 10),
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            auth_id: "df2590dc-5dae-419d-9039-8b1c85dcd327",
            email: "juggernaut@gmail.com",
            password: await bcrypt.hash("dota1234", 10),
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            auth_id: "a4d0b08c-b2c0-4a27-ad48-1127d03a3c18",
            email: "antimage@gmail.com",
            password: await bcrypt.hash("dota1234", 10),
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            auth_id: "7634cfd5-d1de-4211-8990-99225252b906",
            email: "phantomassasin@gmail.com",
            password: await bcrypt.hash("dota1234", 10),
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction: t }
      );

      await queryInterface.bulkInsert(
        "User",
        [
          {
            user_id: "3accb32e-d994-4832-a107-b6f3d1ea6544",
            auth_id: "34e4ae0d-51a1-4223-a7d3-a106a9f0caff",
            role: "Super Admin",
            gender: "Male",
            image_url: "userDefault.jpg",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: "f9d37c57-b6ac-4d78-9dde-6a3442821785",
            auth_id: "32e897cf-9352-462a-b2bd-14e1e37c7ad6",
            role: "Customer",
            gender: "Male",
            image_url: "userDefault.jpg",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: "ab3ff2ca-9e41-4b40-97bf-31ecf729f20b",
            auth_id: "f570b737-b396-49b2-848b-02728890af0d",
            role: "Customer",
            gender: "Male",
            image_url: "userDefault.jpg",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: "a6b4e4ef-a1c4-4b02-b511-9fd49531e254",
            auth_id: "df2590dc-5dae-419d-9039-8b1c85dcd327",
            role: "Customer",
            gender: "Male",
            image_url: "userDefault.jpg",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: "1b6e0025-9dd4-4cbc-86b6-af8dd6af06ee",
            auth_id: "a4d0b08c-b2c0-4a27-ad48-1127d03a3c18",
            role: "Customer",
            gender: "Male",
            image_url: "userDefault.jpg",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            user_id: "71a40b85-4a70-42f5-825e-5e673f923669",
            auth_id: "7634cfd5-d1de-4211-8990-99225252b906",
            role: "Customer",
            gender: "Female",
            image_url: "userDefault.jpg",
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction: t }
      );
    });

    await queryInterface.bulkInsert(
      "Customer",
      [
        {
          customer_id: "63a9ccaa-14bf-4c81-9390-4812f6985898",
          user_id: "f9d37c57-b6ac-4d78-9dde-6a3442821785",
          firstname: "Hafiedz",
          lastname: "Hasmy Hamid",
          phone_number: "+6285255311529",
          address: "Jl.Pendidikan II B2/14",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          customer_id: "88d89e4f-7e59-443d-8f5a-67e9800c7496",
          user_id: "ab3ff2ca-9e41-4b40-97bf-31ecf729f20b",
          firstname: "Faceless",
          lastname: "Void",
          phone_number: "+6285222111333",
          address: "Jl.Hardcarry Safelane",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          customer_id: "1cbe14f5-ed3a-4735-806b-ee2a3c9d35e7",
          user_id: "a6b4e4ef-a1c4-4b02-b511-9fd49531e254",
          firstname: "Juggernaut",
          phone_number: "+6285333111222",
          address: "Jl.Hardcarry Safelane",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          customer_id: "1604b8d7-3b9b-4bd1-84e8-e1c0415d302b",
          user_id: "1b6e0025-9dd4-4cbc-86b6-af8dd6af06ee",
          firstname: "Antimage",
          phone_number: "+6285333333333",
          address: "Jl.Hardcarry Safelane",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          customer_id: "4ae52247-baf8-4c10-b925-8ddcee7f835d",
          user_id: "71a40b85-4a70-42f5-825e-5e673f923669",
          firstname: "Phantom",
          lastname: "Assassin",
          phone_number: "+6285111222333",
          address: "Jl.Hardcarry Safelane",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { transaction: t }
    );

    await queryInterface.bulkInsert("Admin", [
      {
        admin_id: "ada57a7d-c646-4fde-8bdd-b5261a641455",
        user_id: "3accb32e-d994-4832-a107-b6f3d1ea6544",
        firstname: "Hafiedz",
        lastname: "Hasmy Hamid",
        status: "Active",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
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
