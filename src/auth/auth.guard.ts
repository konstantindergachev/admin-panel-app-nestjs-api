import { IExpressRequest } from './interfaces/auth.interface';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { NOT_AUTHORIZED_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest<IExpressRequest>();
    try {
      const jwt = request?.cookies?.jwt;
      const { id } = this.jwtService.verify(jwt);
      if (id) {
        return true;
      }
      throw new HttpException(NOT_AUTHORIZED_ERROR, HttpStatus.UNAUTHORIZED);
    } catch (error) {
      return false;
    }
  }
}
