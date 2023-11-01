import { IsString } from 'class-validator';

export class createPostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
