import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeRoleDto } from './dto/change-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);

    if (user.id === 1) {
      await this.changeRole({ userId: user.id, value: 'ADMIN' });

      user.role = 'ADMIN';
    }

    return user;
  }

  async getAllUsers() {
    return await this.userRepository.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async changeRole(dto: ChangeRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);

    if (!user) {
      throw new HttpException('User id is wrong', 400);
    }

    user.role = dto.value;

    await user.save();

    return user;
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);

    if (!user) {
      throw new HttpException('User is wrong', 400);
    }

    user.isBanned = true;
    user.banReason = dto.banReason;

    user.save();

    return user;
  }
}
