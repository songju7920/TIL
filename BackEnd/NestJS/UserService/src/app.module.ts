import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    //typeORM설정
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      //appModule에 TypeOrmModule을 동적 모듈로 가져온다.
      useFactory: async (config: ConfigService) => ({
        type: 'mysql', // DB 타입 (MySQL, MongoDB)
        port: config.get<number>('DB_PORT'), // DB가 연결을 위해 열어놓은 PORT 번호
        host: config.get<string>('DB_HOST'), // DB 호스트 주소
        database: config.get<string>('DB_NAME'), // DB 스키마 이름
        username: config.get<string>('DB_USERNAME'), // DB USER 이름
        password: config.get<string>('DB_PASSWORD'), // DB USER PW
        entities: [__dirname + '/**/entities/*.js'], // TypeORM 구동시 인식할 entity 클래스의 경로를 지정
        synchronize: false, // 구동시 소스코드 기반으로 데이터베이스 스키마를 동기화할지 여부이다. (true: 구동할때마다 DB 초기화)
        autoLoadEntities: true, // 엔티티를 자동로드 할 것인지 여부
        timezone: config.get<string>('TZ'), // 타임존(서버 시간)
      }),
      inject: [ConfigService],
    }),
    //userModule 불러오기
    UserModule,
  ],
  controllers: [],
  providers: [],
})

//node에서의 module.exports와 비슷한 존재.
export class AppModule {}
