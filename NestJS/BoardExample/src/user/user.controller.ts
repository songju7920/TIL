import { Body, Controller, Delete, Headers, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/createUser.dto';
import { logInDto } from './dto/logIn.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async createUser(@Body() userDto: createUserDto) {
    await this.userService.createUser(userDto);

    return Object.assign({
      statusCode: 201,
      statusMsg: '유저 생성에 성공했습니다.',
    });
  }

  @Delete('/')
  async deleteUser(@Headers('authorization') token: string) {
    await this.userService.deleteUser(token);

    return Object.assign({
      statusCode: 204,
    });
  }

  @Post('/logIn')
  async logIn(@Body() userDto: logInDto) {
    const tokens = await this.userService.LogIn(userDto);

    return Object.assign({
      tokens,
      statusCode: 200,
      statusMsg: '로그인 성공',
    });
  }
}
