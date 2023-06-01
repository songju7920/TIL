//models에서 write만 디스턱처링(추출)해서 가져오기
const { write } = require("../models");

//Create
//비동기화 모듈 생성
const createWriting = async (req, res) => {
  //서버의 create요청에서 writeID, writeHead, writeBody, writeUser를 추출해 가져오기
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

//Read
const readWriting = async (req, res) => {
  //서버의 읽기 요청에서 writeID를 추출해 가져오기
  const { writeID } = req.body;

  //아래 코드를 실행해보기
  try {
    //writeID를 write에서 찾아 내용을 writed에 담을때까지 대기
    const writed = await write.findOne({
      where: { writeID },
    });

    //만약 writeID가 존재하지 않을경우 404상태코드와 실패 메세지를 담은 JSON 응답 전송
    if (!writed)
      return res.status(404).json({
        massage: "존재하지 않는 게시물을 읽을 수 없습니다.",
      });

    //상태코드 200과 성공 메세지, writed를 담은 JSON 응답 전송
    return res.status(200).json({
      massage: "요청에 성공했습니다.",
      writed,
    });
  } catch (err) {
    //실패시 터미널에 에러 띄우기
    console.error(err);
    //상태코드 400과 실패 메세지를 담은 JSON 응답 전송
    return res.status(400).json({
      massage: "요청에 실패했습니다.",
    });
  }
};

//delete
const deleteWriting = async (req, res) => {
  //delete 요청에서 writeID를 추출
  const { writeID } = req.body;

  //아래코드 실행해보기
  try {
    //write에서 writeID를 찾아 내용을 thisWrite에 담을때까지 대기
    const thisWrite = await write.findOne({
      where: { writeID },
    });

    //writeID가 write에 존재하지 않는다면 404상태코드와 실패 메세지를 담은 JSON 응답 전송
    if (!writeID)
      return res.status(404).json({
        massage: "존재하지 않는 계시물을 지울수 없습니다.",
      });

    //thisWrite가 삭제될때까지 대기하기
    await thisWrite.destroy({
      where: { writeID },
    });

    //204상태코드를 담은 JSON 응답 전송
    return res.status(204).json({});
  } catch (err) {
    //실패시 터미널에 에러 띄우기
    console.error(err);
    //400상태코드와 실패메세지 담은 JSON 응답 전송.
    return res.status(400).json({
      massage: "요청에 실패했습니다.",
    });
  }
};

//update
const updateWriting = async (req, res) => {
  //update 요청에서 writeID, writeHead, writeBody를 추출
  const { writeID, writeHead, writeBody } = req.body;

  //아래 코드 실행해보기
  try {
    //write에서 writeID추출해서 thisWrite에 내용 담기
    const thisWrite = await write.findOne({
      where: { writeID },
    });

    //write에 writeID가 없을경우 404상태코드와 실패 메세지를 담은 JSON 응답 전송
    if (!thisWrite)
      return res.status(404).json({
        massage: "존재하지 않는 계시물은 수정할 수 없습니다.",
      });

    //writeHead와 writeBody를 수정할때까지 대기
    await thisWrite.update({
      writeHead,
      writeBody,
    });

    //상태코드 200과 성공 메세지를 담은 JSON 응답 전송
    return res.status(200).json({
      massage: "요청에 성공했습니다.",
    });
  } catch (err) {
    //실패시 터미널에 에러 띄우기
    console.error(err);
    //400상태코드와 실패메세지 담은 JSON 응답 전송.
    return res.status(400).json({
      massage: "요청에 실패하였습니다.",
    });
  }
};

//위 4개의 함수를 모듈로 내보내기
module.exports = {
  createWriting,
  readWriting,
  updateWriting,
  deleteWriting,
};
