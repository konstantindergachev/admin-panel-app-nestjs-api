import { AuthGuard } from '@app/auth/auth.guard';
import { AuthService } from '@app/auth/auth.service';
import { Request } from 'express';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateInfoDto } from './dto/user-update-info.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { PASSWORD_CONFIRM_ERROR } from './user.constants';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async all(@Query('page') page = 1): Promise<UserEntity[]> {
    return this.userService.paginate(page);
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<UserEntity> {
    if (body.password !== body.password_confirm) {
      throw new BadRequestException(PASSWORD_CONFIRM_ERROR);
    }
    const { roleId, ...data } = body;
    return this.userService.create({ ...data, role: { id: roleId } });
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findById({ id });
  }

  @Put('info')
  async updateInfo(
    @Req() request: Request,
    @Body() body: UserUpdateInfoDto,
  ): Promise<object> {
    const id = await this.authService.userId(request);
    return this.userService.findByIdAndUpdate(id, body);
  }

  @Put('password')
  async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
  ): Promise<object> {
    if (password !== password_confirm) {
      throw new BadRequestException(PASSWORD_CONFIRM_ERROR);
    }
    const id = await this.authService.userId(request);
    const hashed = await this.userService.hashedPassword(password);
    return this.userService.findByIdAndUpdate(id, { password: hashed });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UserUpdateDto,
  ): Promise<object> {
    const { roleId, ...data } = body;
    return this.userService.findByIdAndUpdate(id, {
      ...data,
      role: { id: roleId },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<object> {
    return this.userService.findByIdAndDelete(id);
  }
}
