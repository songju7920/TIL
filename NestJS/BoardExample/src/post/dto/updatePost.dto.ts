/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';


export class updatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
