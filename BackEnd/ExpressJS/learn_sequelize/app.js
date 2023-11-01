//필요한 파일들을 임포트 또는 디스턱처링(추출)하기
const express = require("express");
const { sequelize } = require("./models");
const dotenv = require("dotenv");

//config 파일 불러오기
dotenv.config();

//라우터(사용자 요청 처리 모듈) 불러오기
const router = require("./router/index");
//express 사용 가능한 상태로 설정
const app = express();
//포트 번호 설정
const port = 8080;

//미들웨어 설정하기
//서버 요청이 Json파일일때 JavaScript 객체로 변환.
app.use(express.json());
//서버 요청이 URL파일일때 JavaScript 객체로 변환하고, querystring해독을 내장 함수로 처리한다.
app.use(express.urlencoded({ extended: false }));
//엔드포인트 '/'가 들어오면 router실행하기
app.use("/", router);

//
app.listen(port, () => {
  console.log(`Sever is litening on port ${port}!`);

  //기존 테이블을 삭제하지 않으면서 동기화
  sequelize
    .sync({ force: false })
    //프로미스 성공시 -> 성공 메세지 터미널에 띄우기
    .then(() => {
      console.log(`Success to link DataBase!`);
    })
    //프로미스 실패시 -> 오류 터미널에 띄우기
    .catch((err) => {
      console.error(err);
    });
});
