import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.SECRETORPRIVATE,
      signOptions: { expiresIn: '4h' },
      verifyOptions: { complete: false },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
