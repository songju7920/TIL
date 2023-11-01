/* eslint-disable prettier/prettier */

/*
  Dto(Data Transfer Object)는 데이터 전송에 사용되는 객체로 정의된다.

  DTO는 절대 비지니스 로직을 가져서는 안되며, 순수하게 getter, setter을 이용한 데이터 입출력과 저장에만 사용되어야한다.
*/

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  userID: number;

  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  email?: string;
}
