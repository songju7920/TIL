//express를 불러옴과 동시에 사용 가능상태로 활성화
const express = require("express")();
//controller안의 파일을 불러오기 위해 require을 사용해 불러옴.
const sever8000 = require("./Controller/sever8000");
const hello = require("./Controller/hello");
const dev = require("./Controller/dev");

//상수 host의 값을 8000으로 지정(서버 수신대기 포트 번호)
const host = 8000;

//get함수를 이용한 경로 지정
express.get("/", sever8000.Run); // '/' 가 요청됬을시 sever8000.Run과 연결
express.get("/hello", hello.Run); // '/hello' 가 요청됬을시 hello.Run과 연결
express.get("/dev", dev.Run); // '/dev' 가 요청됬을시 dev.Run과 연결

//express.listen()함수를 사용하여 지정된 번지에 서버에서 요청을 수신 및 처리할수 있도록 서버를 구축 및 설정한다.
express.listen(host, () => {
  //만약 성공적으로 연결 됬다면 "test sever is listening at host ${host}"를 터미널에 띄운다.
  console.log(`test sever is listening at host ${host}`);
});
