import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from './dto/createUser.dto';
import { logInDto } from './dto/logIn.dto';
import { JwtService } from '@nestjs/jwt';
import { userPayloadDto } from './dto/userPayload.dto';
import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Redis } from 'ioredis';

@Injectable()
export class UserService {
  constructor(
    @InjectRedis() private readonly redis: Redis
    @InjectRepository(User) private userEntity: Repository<User>,
    private jwt: JwtService,
  ) {}

  async createUser(userDto: createUserDto) {
    const { userName, password, email } = userDto;

    await this.userEntity.save({
      userName,
      password,
      email,
    });
  }

  async deleteUser(token: string) {
    const user = await this.validateAccess(token);

    const result = await this.userEntity.delete(user.userID);

    if (!result) throw new NotFoundException('유저를 찾을 수 없습니다');
  }

  //로그인
  async LogIn(userDto: logInDto): Promise<object> {
    const { userName, password } = userDto;

    const user = await this.userEntity.findOneBy({ userName });

    if (!user)
      throw new NotFoundException(`could not find user ${userName}`);

    if (user.password != password)
      throw new ConflictException(`password isn't correct`);

    const payload = { userID: user.userID, userName: userName };

    const accessToken = this.generateAccess(payload);
    const refreshToken = this.generateRefresh(payload);

    await this.redis.set(`${user.userID}AccessToken`, accessToken);
    await this.redis.set(`${user.userID}RefreshToken`, refreshToken);

    return { accessToken, refreshToken };
  }

  //AccessToken 발급
  async generateAccess(payload: userPayloadDto): Promise<string> {
    const accessToken = this.jwt.sign(payload, {
      secret: process.env.JWT_SECRET_ACCESS,
    });

    return `Bearer ${accessToken}`;
  }

  //RefreshToken 발급
  async generateRefresh(payload: userPayloadDto): Promise<string> {
    const refreshToken = this.jwt.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH,
      expiresIn: '48h',
    });

    return `Bearer ${refreshToken}`;
  }

  //토큰 인증
  async validateAccess(accessToken: string): Promise<userPayloadDto> {
    const accesstoken = accessToken.split(' ')[1];

    const access = await this.jwt.verify(accesstoken, {
      secret: process.env.JWT_SECRET_ACCESS,
    });

    return access;
  }
}
