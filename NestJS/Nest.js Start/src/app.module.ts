import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})

//node에서의 module.exports와 비슷한 존재.
export class AppModule {}
