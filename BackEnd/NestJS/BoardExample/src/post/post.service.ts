import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { createPostDto } from './dto/createPost.dto';
import { updatePostDto } from './dto/updatePost.dto';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postEntity: Repository<Post>) {}

  async createPost(postDto: createPostDto) {
    const { title, content } = postDto;

    await this.postEntity.save({
      title,
      content,
    });

    return title;
  }

  async getPost(postID: number) {
    const thisPost = await this.postEntity.findOneBy({ postID });

    if (!thisPost)
      throw new NotFoundException(`could not found post ID is : ${postID}`);

    return thisPost;
  }

  async updatePost(postID: number, postDto: updatePostDto) {
    const { title, content } = postDto;

    const thisPost = await this.postEntity.findOneBy({ postID });

    if (!thisPost)
      throw new NotFoundException(`could not found post ID is : ${postID}`);

    const pacthedPost = await this.postEntity.update(
      { postID },
      { title, content },
    );

    return pacthedPost;
  }

  async deletePost(postID: number) {
    const result = await this.postEntity.delete(postID);

    if (result.affected === 0)
      throw new NotFoundException(`could not found post ID is : ${postID}`);

    return postID;
  }
}
