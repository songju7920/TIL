import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

//controller뒤에 괄호안 문자열은 url의 경로를 지정한다. 즉, 이 예제에선 localhost:${port}/user로 밑의 코드들에 접근할 수 있는 것.
@Controller('user')
export class UserController {
  //의존성 주입, 이 클래스는 UserService의 변화에 영향을 받음
  constructor(private readonly userService: UserService) {}

  @Post('createUser')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const data = await this.userService.createUser(createUserDto);

    return Object.assign({
      data,
      statusCode: 201,
      statusMsg: '유저 생성에 성공했습니다.',
    });
  }
}
