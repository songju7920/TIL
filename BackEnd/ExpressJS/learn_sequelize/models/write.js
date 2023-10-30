const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //module name(=table name)
  return sequelize.define("write", {
    //Attributes (컬럼)
    writeID: {
      type: DataTypes.INTEGER(), //이 컬럼의 데이타타입 지정
      primaryKey: true, // 고유키로 지정
      autoIncrement: true, // 자동으로 값을 증가시킴
    },
    writeUser: {
      type: DataTypes.STRING(),
      allowNull: false, //Null값을 허용하지 않음
    },
    writeHead: {
      type: DataTypes.STRING(),
      allowNull: false,
      defaultValue: "HEAD", //기본값을 "HEAD"로 설정
    },
    writeBody: {
      type: DataTypes.STRING(),
    },
  });
};
