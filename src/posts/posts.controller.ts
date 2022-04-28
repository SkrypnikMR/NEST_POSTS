import { ValidationPipe } from './../pipes/validation.pipe';
import { CreatePostDto } from './dto/CreatePost.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Post as PostModel } from 'src/posts/posts.model';
import {
  Body,
  Controller,
  UseGuards,
  Post,
  UploadedFile,
  UsePipes,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Create Post' })
  @ApiResponse({ status: 201, type: PostModel })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() postDto: CreatePostDto, @UploadedFile() image) {
    return this.postService.createPost(postDto, image);
  }
}
