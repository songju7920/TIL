import { Injectable } from '@nestjs/common';

//다른 클래스가 이 클래스를 DI가능하게 만들어줌
@Injectable()
export class UserService {
  printHello(): string {
    return 'hello Nest!';
  }
}
