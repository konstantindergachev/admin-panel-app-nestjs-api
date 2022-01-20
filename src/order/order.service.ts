import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async paginate(currentPage = 1): Promise<any> {
    const recordsPerPage = 2;

    const result = await this.orderRepository.findAndCount({
      take: recordsPerPage,
      skip: (currentPage - 1) * recordsPerPage,
      relations: ['order_items'],
    });

    const [orders, total] = result;

    const lastPage = Math.ceil(total / recordsPerPage);
    const metadata = { total, currentPage, lastPage };
    return { orders, metadata };
  }

  async all(): Promise<OrderEntity[]> {
    return await this.orderRepository.find({ relations: ['order_items'] });
  }

  async chart(): Promise<object[]> {
    return this.orderRepository.query(`
        select date(o.created_at) as date, sum(oi.price * oi.quantity) as sum
        from orders o
        join order_items oi on o.id = oi.order_id
        group by date;
    `);
  }
}
