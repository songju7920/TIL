import { IsString } from 'class-validator';

export class logInDto {
  @IsString()
  userName: string;

  @IsString()
  password: string;
}
