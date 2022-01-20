import { AuthService } from '@app/auth/auth.service';
import { RoleService } from '@app/role/role.service';
import { UserEntity } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const access = this.reflector.get<string>('access', context.getHandler());
    if (!access) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const id = await this.authService.userId(request);

    const user: UserEntity = await this.userService.findById({ id });

    const role = await this.roleService.findById({ id: user.role.id });

    // if (request.method === 'GET') {
    //   return role.permissions.some(
    //     (permission) =>
    //       permission.name === `view_${access}` ||
    //       permission.name === `edit_${access}`,
    //   );
    // }

    // return role.permissions.some((permission) => permission.name === access);
    return true;
  }
}
