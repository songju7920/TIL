/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';

export class createUserDto {
  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  email: string;
}
