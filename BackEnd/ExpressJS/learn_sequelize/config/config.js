require("dotenv").config(); //환경변수 로드

const { env } = process; //process에서 env(환경 변수)만 추출(디스트럭처링)하여 저장.

//개발환경 담을 객체 'development' 생성
const development = {
  username: env.DB_USER,
  password: env.DB_PW,
  database: env.DB_NAME,
  dialect: env.DB_DIALECT,
  host: env.DB_HOST,
};

//module exports로 development 내보내기
module.exports = development;
