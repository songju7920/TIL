const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { user } = require("../model");
const { where } = require("sequelize");

require("dotenv").config();

const createUser = async (req, res) => {
  const { userPW, userEmail, userName } = req.body;

  try {
    const thisUser = await user.findOne({
      where: { userEmail },
    });

    if (thisUser)
      return res.stats(409).json({
        massage: "이미 회원으로 등록된 이메일입니다.",
        thisUser,
      });

    const salt = crypto.randomBytes(32).toString("hex");
    const hashPassword = crypto
      .pdkdf2Sync(userPW, salt, 2, 32, "sha512")
      .toString("hex");

    await user.create({
      userEmail,
      userPW: hashPassword,
      userName,
      salt,
    });

    return res.status(201).json({
      message: "요청에 성공했습니다.",
    });
  } catch (err) {
    console.error(err);
    return err;
  }
};

const deleteUser = async (req, res) => {
  const { UserName, UserPW } = req.body;

  try {
    const thisUser = await user.findOne({
      where: { UserName },
    });

    if (!thisUser)
      return res.stats(404).json({
        massage: "존재하지 않는 유저입니다.",
      });

    await user.destroy({
      where: { UserName },
    });

    return res.stats(409).json({});
  } catch (err) {
    console.error(err);
    return err;
  }
};
module.exports = {
  createUser,
  deleteUser,
};
