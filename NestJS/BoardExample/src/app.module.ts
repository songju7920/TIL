import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { UserModule } from './user/user.module';

config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        port: config.get<number>('DB_PORT'),
        host: config.get<string>('DB_HOST'),
        database: config.get<string>('DB_NAME'),
        password: config.get<string>('DB_PASSWORD'),
        username: config.get<string>('DB_USERNAME'),
        entities: [__dirname + '/**/entities/*.js'],
        autoLoadEntities: true,
        synchronize: true,
        timezone: config.get<string>('TZ'),
      }),
      inject: [ConfigService],
    }),
    PostModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
