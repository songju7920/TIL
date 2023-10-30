import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  //entity 등록
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService], //DI를 위해선 이곳에 등록해주어야 함
})
export class UserModule {}
