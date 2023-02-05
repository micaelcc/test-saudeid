import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ManagerController } from './controllers/manager.controller';
import { CreateProductService } from './services/create-product.service';
import { UpdateStockService } from './services/update-stock.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STOCK_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'redis',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [ManagerController],
  providers: [CreateProductService, UpdateStockService],
})
export class AppModule {}
