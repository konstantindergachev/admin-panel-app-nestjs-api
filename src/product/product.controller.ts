import { AuthGuard } from '@app/auth/auth.guard';
import {
  Query,
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductUpdateDto } from './dto/product-update.dto';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async all(@Query('page') page = 1): Promise<ProductEntity[]> {
    return this.productService.paginate(page);
  }

  @Post()
  async create(@Body() body: ProductCreateDto): Promise<ProductEntity> {
    return this.productService.create(body);
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<ProductEntity> {
    return this.productService.findById({ id });
  }
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: ProductUpdateDto,
  ): Promise<object> {
    return this.productService.findByIdAndUpdate(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<object> {
    return this.productService.findByIdAndDelete(id);
  }
}
