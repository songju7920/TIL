const Sequelize = require("sequelize");
const env = "development"; //config 파일과 연동
const config = require("../config/config.js"); //config모듈을 임포트

//모델들을 담을 객체 생성
const db = {};

//데이터베이스 자동 연결 비활성화 옵션 설정과, config모듈의 객체를 담은 Sequelize인스턴스를 sequelize로 정의
const sequelize = new Sequelize({ ...config, sync: false });

//객체 db에 sequelize와 Sequelize를 할당
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//db.write에 write.js에 매게변수 sequelize, Sequelize를 할당한 실행결과를 저장
db.write = require("./write.js")(sequelize, Sequelize);

//모듈로 내보내기.
module.exports = db;
