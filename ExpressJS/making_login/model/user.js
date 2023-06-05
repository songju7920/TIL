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
      UserPW: {
        type: DataType.STRING(11),
        allowNull: false,
      },
      UserName: {
        type: DataType.STRING(),
        allowNull: false,
      },
      UserEmail: {
        type: DataType.STRING(30),
        allowNull: false,
      },
      accessToken: {
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
