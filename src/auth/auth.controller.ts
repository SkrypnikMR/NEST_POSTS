import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from '../users/users.model';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User Authorization' })
  @ApiResponse({ status: 201, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  authorization(@Body() userDto: CreateUserDto) {
    return this.authService.authorization(userDto);
  }
}
