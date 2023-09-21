import { IsNumber, IsString } from 'class-validator';

export class userPayloadDto {
  @IsNumber()
  userID: number;

  @IsString()
  userName: string;
}
