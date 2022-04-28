import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'Email' })
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'Incorrect email format' })
  readonly email: string;
  @ApiProperty({ example: 'qwe123', description: 'Password' })
  @IsString({ message: 'Must be string' })
  @Length(4, 16, { message: 'Must be > 4 and < 16 symbols' })
  readonly password: string;
}
