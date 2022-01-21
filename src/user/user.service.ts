import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CREDENTIALS_ERROR, NOT_FOUND_ERROR } from '@app/auth/auth.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async all(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async create(data): Promise<UserEntity> {
    const hashed = await this.hashedPassword(data.password);
    const user = await this.userRepository.save({
      ...data,
      password: hashed,
    });

    delete user.password;
    delete user.password_confirm;

    return user;
  }

  async findByEmail(data): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email: data['email'] });

    if (!user) {
      throw new NotFoundException(NOT_FOUND_ERROR);
    }
    const isCorrect = await bcrypt.compare(data.password, user.password);
    if (!isCorrect) {
      throw new BadRequestException(CREDENTIALS_ERROR);
    }
    return user;
  }

  async findById(data): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      { id: data['id'] },
      { relations: ['role'] },
    );

    if (!user) {
      throw new NotFoundException(NOT_FOUND_ERROR);
    }

    return user;
  }

  async findByIdAndUpdate(id: number, data): Promise<object> {
    await this.userRepository.update(id, data);

    const user = await this.findById({ id });

    if (!user) {
      throw new NotFoundException(NOT_FOUND_ERROR);
    }

    return user;
  }

  async findByIdAndDelete(id: number): Promise<object> {
    const user = await this.userRepository.delete(id);

    if (!user) {
      throw new NotFoundException(NOT_FOUND_ERROR);
    }

    return { message: 'User was deleted successfully' };
  }

  async hashedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async paginate(currentPage = 1): Promise<any> {
    const recordsPerPage = 2;

    const [users, total] = await this.userRepository.findAndCount({
      take: recordsPerPage,
      skip: (currentPage - 1) * recordsPerPage,
      relations: ['role'],
    });

    const lastPage = Math.ceil(total / recordsPerPage);
    const metadata = { total, currentPage: +currentPage, lastPage };
    return { users, metadata };
  }
}
