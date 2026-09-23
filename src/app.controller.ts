import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service.js';
import { ClientProxy } from '@nestjs/microservices/client/index.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PAYMENTS_SERVICE')
    private readonly paymentsClient: ClientProxy,
  ) {}


  @Post()
  createOrder(
    @Body()
    body: {
      customerId: number;
      total: number;
    },
  ) {
    const order = {
      orderId: Date.now(),
      customerId: body.customerId,
      total: body.total,
    };

    console.log('📦 Pedido criado:', order);

    this.paymentsClient.emit('order.created', order);

    return {
      message: 'Pedido criado com sucesso',
      order,
    };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


}
