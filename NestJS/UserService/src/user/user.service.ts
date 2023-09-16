import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

//다른 클래스가 이 클래스를 DI가능하게 만들어줌
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userEntity: Repository<User>) {}

  async createUser(userDto: CreateUserDto) {
    const { userName, password, email } = userDto;

    const hashPW = await bcrypt.hash(password, 10);

    await this.userEntity.save({
      userName,
      password: hashPW,
      email,
    });

    return userName;
  }
}
