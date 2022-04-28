import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authorization(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      return await this.login(userDto, candidate);
    } else {
      return await this.registration(userDto);
    }
  }

  private async login(userDto: CreateUserDto, candidate: User) {
    await this.checkPassword(userDto, candidate);

    return await this.generateToken(candidate);
  }

  private async registration(userDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    return {
      token: this.jwtService.sign(
        { email: user.email, id: user.id, role: user.role },
        { secret: process.env.SECRET_KEY },
      ),
    };
  }

  private checkPassword = async (userDto: CreateUserDto, candidate: User) => {
    const isPasswordsEquals = await bcrypt.compare(
      userDto.password,
      candidate.password,
    );

    if (!isPasswordsEquals) {
      throw new UnauthorizedException({
        message: 'Incorrect login or password',
      });
    }
  };
}
