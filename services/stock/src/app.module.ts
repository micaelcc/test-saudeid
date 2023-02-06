import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StockController } from '@/presentation/controllers/stock.controller';
import { CreateProductUseCase } from '@/use-cases/create-product.usecase';
import { UpdateStockUseCase } from '@/use-cases/update-stock.usecase';
import { ProductsRepository } from '@/domain/product.repository';
import { MongoProductsRepository } from '@/infra/db/mongodb/repositories/product.repository';
import { mongodbConfig } from './infra/db/mongodb/config';
@Module({
  imports: [MongooseModule.forRoot(mongodbConfig.MONGO_URL_DEV)],
  controllers: [StockController],
  providers: [
    CreateProductUseCase,
    UpdateStockUseCase,
    { provide: ProductsRepository, useClass: MongoProductsRepository },
  ],
})
export class AppModule {}
