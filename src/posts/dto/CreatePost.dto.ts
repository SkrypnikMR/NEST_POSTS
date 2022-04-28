import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Big text', description: 'Post body' })
  @Length(4, 50, { message: 'Title must be from 4 to 50 symbols' })
  @IsNotEmpty({ message: 'Title must be no empty' })
  readonly title: string;
  @ApiProperty({ example: 'Big text', description: 'Post body' })
  @IsString({ message: 'Must be string' })
  @Length(4, 255, { message: 'Body must be from 4 to 255 symbols' })
  @IsNotEmpty({ message: 'Body must be no empty' })
  readonly body: string;
}
