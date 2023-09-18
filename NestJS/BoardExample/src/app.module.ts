import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
