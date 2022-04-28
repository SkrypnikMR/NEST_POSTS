import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @ApiProperty({ example: 2, description: 'User Id' })
  @IsNumber({}, { message: 'Must Be Number' })
  readonly userId: number;
  @ApiProperty({ example: 'Retard', description: 'Ban reason' })
  @IsString({ message: 'Must be string' })
  readonly banReason: string;
}
