import { Product } from '@/entities/product';
import { UpdateStockService } from '../update-stock.service';
import { PRODUCTS_MOCK } from './mocks/products';
import { StockClientStub } from './mocks/stock-client-stub';

describe('UpdateStockService', () => {
  let sut: UpdateStockService;
  let stockClient: StockClientStub;

  beforeAll(() => {
    stockClient = new StockClientStub();
    sut = new UpdateStockService(stockClient);
  });

  test('Should call stock client with correct values', async () => {
    const clientSpy = jest.spyOn(stockClient, 'emit');

    const updateStock = {
      addedProducts: PRODUCTS_MOCK,
      removedProducts: [] as Product[],
    };

    await sut.execute(updateStock);

    expect(clientSpy).toHaveBeenCalledTimes(1);
    expect(clientSpy).toHaveBeenCalledWith('updateStock', updateStock);
  });
});
