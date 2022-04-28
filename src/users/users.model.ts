import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/posts/posts.model';

interface UserCreationAttributes {
  email: string;
  password: string;
}

@Table({ tableName: 'users', createdAt: false, updatedAt: false })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'example@gmail.com', description: 'Unique email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: 'qwe123',
    description: 'Password with numbers and letters',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isBanned: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'USER',
  })
  role: string;

  @HasMany(() => Post)
  posts: Post[];
}
