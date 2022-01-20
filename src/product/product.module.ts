import { CommonModule } from '@app/common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { UploadController } from './upload.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), CommonModule],
  controllers: [ProductController, UploadController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
