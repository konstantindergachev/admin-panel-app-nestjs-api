import { AuthGuard } from '@app/auth/auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { HasPermission } from './decorators/has-permission.decorator';
import { PermissionEntity } from './permission.entity';
import { PermissionService } from './permission.service';

@UseGuards(AuthGuard)
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @HasPermission('view_permissions')
  async all(): Promise<PermissionEntity[]> {
    return this.permissionService.all();
  }
}
