import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  printHello(): string {
    return 'hello Nest!';
  }
}
