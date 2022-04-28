import { FilesService } from './../files/files.service';
import { Post } from 'src/posts/posts.model';
import { CreatePostDto } from './dto/CreatePost.dto';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectModel } from '@nestjs/sequelize';

interface UserFromToken {
  id: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

interface CustomRequest extends Request {
  user: UserFromToken;
}

@Injectable({ scope: Scope.REQUEST })
export class PostsService {
  constructor(
    @Inject(REQUEST) private readonly request: CustomRequest,
    @InjectModel(Post) private postRepository: typeof Post,
    private fileService: FilesService,
  ) {}

  async createPost(postDto: CreatePostDto, image) {
    const fileName = await this.fileService.createFile(image);
    return this.postRepository.create({
      ...postDto,
      userId: this.request.user.id,
      image: fileName,
    });
  }
}
