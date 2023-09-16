import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

//controller뒤에 괄호안 문자열은 url의 경로를 지정한다. 즉, 이 예제에선 localhost:${port}/user로 밑의 코드들에 접근할 수 있는 것.
@Controller('user')
export class UserController {
  //의존성 주입, 이 클래스는 UserService의 변화에 영향을 받음
  constructor(private readonly userService: UserService) {
    // ???
    this.userService = userService;
  }

  //Get method요청이라는 것을 설정. 괄호안 문자열은 엔드포인트를 지정함.
  @Get('/printHello')
  getHello(): string {
    return this.userService.printHello();
  }
}
