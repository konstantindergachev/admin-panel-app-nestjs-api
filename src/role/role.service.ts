import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NOT_FOUND_ERROR } from './role.constants';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async all(): Promise<RoleEntity[]> {
    return this.roleRepository.find();
  }

  async create(data): Promise<RoleEntity> {
    const role = await this.roleRepository.save(data);

    return role;
  }

  async findById(data): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne(
      { id: data['id'] },
      { relations: ['permissions'] },
    );

    if (!role) {
      throw new NotFoundException(NOT_FOUND_ERROR);
    }

    return role;
  }

  async findByIdAndUpdate(id: number, data): Promise<object> {
    const role = await this.roleRepository.update(id, data);

    if (!role) {
      throw new NotFoundException(NOT_FOUND_ERROR);
    }

    return { message: 'Role was updated successfully' };
  }

  async findByIdAndDelete(id: number): Promise<object> {
    const role = await this.roleRepository.delete(id);

    if (!role) {
      throw new NotFoundException(NOT_FOUND_ERROR);
    }

    return { message: 'Role was deleted successfully' };
  }
}
