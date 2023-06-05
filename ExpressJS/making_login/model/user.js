const sequelize = require("sequelize");

module.exports = (sequelize, DataType) => {
  return sequelize.define(
    "user",
    {
      UserID: {
        type: DataType.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
      },
      userPW: {
        type: DataType.STRING(),
        allowNull: false,
    },
    userName: {
        type: DataType.STRING(),
        allowNull: false,
    },
    userEmail: {
        type: DataType.STRING(30),
        allowNull: false,
        unique: true,
    },cessToken: {
        type: DataType.STRING(),
        allowNull: true,
      },
      salt: {
        type: DataType.STRING(),
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      timestmaps: false,
    }
  );
};
