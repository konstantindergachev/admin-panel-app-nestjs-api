import { NOT_FOUND_ERROR } from './product.constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async paginate(currentPage = 1): Promise<any> {
    const recordsPerPage = 2;

    const [products, total] = await this.productRepository.findAndCount({
      take: recordsPerPage,
      skip: (currentPage - 1) * recordsPerPage,
    });

    const lastPage = Math.ceil(total / recordsPerPage);
    const metadata = { total, currentPage, lastPage };
    return { products, metadata };
  }

  async create(data): Promise<ProductEntity> {
    const product = await this.productRepository.save(data);

    return product;
  }

  async findById(data): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ id: data['id'] });

    if (!product) {
      throw new NotFoundException(NOT_FOUND_ERROR);
    }

    return product;
  }

  async findByIdAndUpdate(id: number, data): Promise<object> {
    const product = await this.productRepository.update(id, data);

    if (!product) {
      throw new NotFoundException(NOT_FOUND_ERROR);
    }

    return { message: 'Product was updated successfully' };
  }

  async findByIdAndDelete(id: number): Promise<object> {
    const product = await this.productRepository.delete(id);

    if (!product) {
      throw new NotFoundException(NOT_FOUND_ERROR);
    }

    return { message: 'Product was deleted successfully' };
  }
}
