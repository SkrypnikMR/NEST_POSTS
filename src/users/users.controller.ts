import { ValidationPipe } from './../pipes/validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ChangeRoleDto } from './dto/change-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 201, type: User })
  @UsePipes(ValidationPipe)
  @Role('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: 200, type: [User] })
  @Role('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Add Role' })
  @ApiResponse({ status: 200, type: User })
  @Role('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch('/change-role')
  changeRole(@Body() addRoleDto: ChangeRoleDto) {
    return this.userService.changeRole(addRoleDto);
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200, type: User })
  @Role('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch('/ban')
  banUser(@Body() banUserDto: BanUserDto) {
    return this.userService.banUser(banUserDto);
  }
}
