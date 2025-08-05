"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Customer.init(
    {
      customer_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          key: "user_id",
          model: "User",
        },
        onDelete: "CASCADE",
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [8],
            msg: "Minimal 8",
          },
          notEmpty: {
            msg: "Nomor telpon tidak boleh kosong",
          },
          isNumeric: {
            msg: "Harus berupa angka",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      verification_status: {
        type: DataTypes.ENUM,
        values: ["Verified", "Not Verified"],
        allowNull: false,
        defaultValue: "Not Verified",
      },
    },
    {
      sequelize,
      modelName: "Customer",
      timestamps: false,
    }
  );
  return Customer;
};
