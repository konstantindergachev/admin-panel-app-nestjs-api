import { AuthGuard } from '@app/auth/auth.guard';
import { Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Response } from 'express';
import { Parser } from 'json2csv';
import { OrderEntity } from './order.entity';
import { OrderItemEntity } from './order-item.entity';

@UseGuards(AuthGuard)
@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('orders')
  async all(@Query('page') page = 1) {
    return this.orderService.paginate(page);
  }

  @Post('export')
  async export(@Res() response: Response) {
    const parser = new Parser({
      fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity'],
    });
    const orders = await this.orderService.all();
    const json = [];
    orders.forEach((o: OrderEntity) => {
      o.order_items.forEach((oi: OrderItemEntity) => {
        json.push({
          ID: o.id,
          Name: `${o.firstname} ${o.lastname}`,
          Email: o.email,
          'Product Title': oi.product_title,
          Price: oi.price,
          Quantity: oi.quantity,
        });
      });
    });

    const csv = parser.parse(json);

    response.header('Content-Type', 'text/csv');
    response.attachment('orders.csv');
    return response.send(csv);
  }

  @Get('chart')
  async chart(): Promise<object[]> {
    return this.orderService.chart();
  }
}
