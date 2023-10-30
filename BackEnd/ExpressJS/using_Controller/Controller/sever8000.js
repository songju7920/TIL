//express를 불러옴과 동시에 사용 가능상태로 활성화
const express = require("express")();

//상수 host의 값을 8000으로 지정(서버 수신대기 포트 번호)
const host = 8000;

//Run이라는 함수를 생성하고 요청 객체 req와 응답 객체 res를 매개변수로 받는다.
const Run = (req, res) => {
  //Run 함수가 호출되면 구문을 통해 "localhost 8000"이라는 문자열을 응답으로 보내 브라우저에서 확인할수 있게 한다.
  res.send("localhost 8000");
};

//Run함수를 내보내 외부에서 사용할수 있게한다.
module.exports = { Run };
