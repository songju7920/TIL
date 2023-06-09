const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { user } = require("../model");

require("dotenv").config();

const createUser = async (req, res) => {
  const { userPW, userEmail, userName } = req.body;

  try {
    const thisUser = await user.findOne({
      where: { userEmail },
    });

    if (thisUser)
      return res.status(409).json({
        massage: "이미 회원으로 등록된 이메일입니다.",
        thisUser,
      });

    const salt = crypto.randomBytes(32).toString("hex");
    const hashPassword = crypto
      .pbkdf2Sync(userPW, salt, 2, 32, "sha512")
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
  const { userName, userPW } = req.body;

  try {
    const thisUser = await user.findOne({
      where: { userName },
    });

    if (!thisUser)
      return res.status(404).json({
        massage: "존재하지 않는 유저입니다.",
      });

    const hashPassword = crypto
      .pbkdf2Sync(userPW, thisUser.salt, 2, 32, "sha512")
      .toString("hex");

    if (hashPassword != thisUser.userPW)
      return res.status(409).json({
        massage: "비밀번호가 일치하지 않습니다",
      });

    await user.destroy({
      where: { userName },
    });

    return res.status(409).json({});
  } catch (err) {
    console.error(err);
    return err;
  }
};

const logIn = async (req, res) => {
  const { userPW, userName } = req.body;

  try {
    const thisUser = await user.findOne({
      where: { userName },
    });

    if (!thisUser)
      return res.status(409).json({
        massage: "아이디나 비밀번호를 확인해주세요",
      });

    if (thisUser.accessToken)
      return res.status(409).json({
        massage: "이미 로그인 되어있는 사용자입니다.",
      });

    const hashPassword = crypto
      .pbkdf2Sync(userPW, thisUser.salt, 2, 32, "sha512")
      .toString("hex");

    if (thisUser.userPW != hashPassword)
      return res.status(409).json({
        massage: "아이디나 비밀번호를 확인해주세요",
      });

    const key = crypto.randomBytes(32).toString("base64");

    const token = jwt.sign(
      {
        type: "JWT",
        userName,
      },
      key,
      {
        expiresIn: "15m",
      }
    );

    await thisUser.update({
      accessToken: token,
    });

    return res.status(200).json({
      massage: "로그인에 성공했습니다.",
      token,
    });
  } catch (err) {
    console.error(err);
    return err;
  }
};

const logOut = async (req, res) => {
  const userName = req.body.userName;
  try {
    const thisUser = await user.findOne({
      where: { userName },
    });

    if (!thisUser.accessToken)
      return res.status(404).json({
        massage: "로그인이 되어있지 않은 사용자입니다.",
      });

    await thisUser.update({
      accessToken: null,
    });

    return res.status(200).json({
      massage: "로그아웃에 성공했습니다.",
    });
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports = {
  createUser,
  deleteUser,
  logIn,
  logOut,
};
