import { Module } from '@nestjs/common';
import { ManagerController } from './controllers/manager.controller';
import { CreateProductService } from './services/create-product.service';
import { UpdateStockService } from './services/update-stock.service';

@Module({
  imports: [],
  controllers: [ManagerController],
  providers: [CreateProductService, UpdateStockService],
})
export class AppModule {}
