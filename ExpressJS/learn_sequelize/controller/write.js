//models에서 write만 디스턱처링(추출)해서 가져오기
const { write } = require("../models");

//비동기화 모듈 생성
const createWriting = async (req, res) => {
  //서버의 create와 update요청에서 writeID, writeHead, writeBody, writeUser를 추출해 가져오기
  const { writeID, writeHead, writeBody, writeUser } = req.body;

  //아래 코드를 실행해보기
  try {
    //writeID가 중복되는지 확인하기
    const haveID = await write.findOne({
      where: { writeID },
    });

    //중복된 경우 409 상태와 실패 메시지를 담은 JSON 응답 전송
    if (haveID)
      return res.status(409).json({ message: "중복된 아이디입니다." });

    //DB의 write테이블에 추출한 데이터들을 담은 행이 생성되끼까지 대기한다
    await write.create({
      writeID,
      writeHead,
      writeBody,
      writeUser,
    });

    //201 상태와 성공 메시지를 담은 JSON 응답 전송
    return res.status(201).json({
      message: "요청에 성공하였습니다.",
    });
  } catch (err) {
    //위 코드에서 오류가 발생시
    //터미널에 오류 메세지 출력
    console.error(err);
    //400 상태와 실패 메시지를 담은 JSON 응답 전송.
    return res.status(400).json({
      message: "요청에 실패하였습니다.",
    });
  }
};

module.exports = createWriting;
