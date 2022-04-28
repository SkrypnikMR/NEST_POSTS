import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const requiredRole = this.reflector.getAllAndOverride<string>(ROLE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!requiredRole) {
        return true;
      }

      const authHeader = req.headers.authorization;
      const [, token] = authHeader.split(' ');

      const currentUser = this.jwtService.verify<{
        email: string;
        id: number;
        role: string;
      }>(token, {
        secret: process.env.SECRET_KEY,
      });
      req.user = currentUser;

      return currentUser.role === requiredRole;
    } catch (e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
