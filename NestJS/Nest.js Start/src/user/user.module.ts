import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService], //DI를 위해선 이곳에 등록해주어야 함
})
export class UserModule {}
