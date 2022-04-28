import { User } from './../users/users.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

interface PostCreationAttr {
  title: string;
  body: string;
  image: string;
  userId: number;
}

@Table({ tableName: 'posts', createdAt: false, updatedAt: false })
export class Post extends Model<Post, PostCreationAttr> {
  @ApiProperty({ example: 1, description: 'Post unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Post Title', description: 'Post title text' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  title: string;

  @ApiProperty({ example: 'I am a post Body', description: 'Post body text' })
  @Column({
    type: DataType.STRING,
  })
  body: string;

  @ApiProperty({ example: '123.png', description: 'Image for post' })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
