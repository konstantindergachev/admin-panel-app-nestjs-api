import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async all(): Promise<RoleEntity[]> {
    return this.roleService.all();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<RoleEntity> {
    return this.roleService.findById({ id });
  }

  @Post()
  async create(
    @Body('name') name: string,
    @Body('permissions') permissions: number[],
  ): Promise<RoleEntity> {
    return this.roleService.create({
      name,
      permissions: permissions.map((id) => ({ id })),
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('permissions') permissions: number[],
  ): Promise<object> {
    this.roleService.findByIdAndUpdate(id, {
      name,
    });

    const role = await this.roleService.findById({ id });
    return this.roleService.create({
      ...role,
      permissions: permissions.map((id) => ({ id })),
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<object> {
    return this.roleService.findByIdAndDelete(id);
  }
}
