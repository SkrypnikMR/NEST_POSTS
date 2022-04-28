import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ChangeRoleDto {
  @ApiProperty({ example: 2, description: 'User Id' })
  @IsNumber({}, { message: 'Must Be Number' })
  readonly userId: number;
  @IsString({ message: 'Must be string' })
  @ApiProperty({ example: 'MANAGER', description: 'Set role' })
  readonly value: string;
}
