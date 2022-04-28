import { FilesModule } from './../files/files.module';
import { AuthModule } from './../auth/auth.module';
import { PostsService } from './posts.service';
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Post } from './posts.model';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [SequelizeModule.forFeature([Post, User]), AuthModule, FilesModule],
})
export class PostsModule {}
