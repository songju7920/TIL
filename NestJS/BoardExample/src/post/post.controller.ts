/* eslint-disable prettier/prettier */
import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { createPostDto } from './dto/createPost.dto';
import { updatePostDto } from './dto/updatePost.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/')
  async createPost(@Body() postDto: createPostDto) {
    const data = await this.postService.createPost(postDto);

    return Object.assign({
      data,
      statusCode: 201,
      statusMsg: '글 게시 요청 성공',
    });
  }

  @Get('/:postID')
  async getPost(@Param('postID') postID: number) {
    const data = await this.postService.getPost(postID);

    return Object.assign({
      data,
      statusCode: 200,
      statusMsg: '게시글 불러오기 성공',
    });
  }

  @Patch('/:postID')
  async updatePost(
    @Param('postID') postID: number,
    @Body() postDto: updatePostDto,
  ) {
    const patchedPost = await this.postService.updatePost(postID, postDto);

    return Object.assign({
      patchedPost,
      statusCode: 200,
      statusMsg: '업데이트 성공',
    });
  }

  @Delete('/:postID')
  async deletePost(@Param('postID') postID: number) {
    const result = this.postService.deletePost(postID);

    return Object.assign({
      result,
      stausCode: 204,
    });
  }
}
