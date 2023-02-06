import { CreateProductService } from '@/services/create-product.service';
import { PRODUCTS_MOCK } from './mocks/products';
import { StockClientStub } from './mocks/stock-client-stub';

describe('CreateProductService', () => {
  let sut: CreateProductService;
  const [PRODUCK_MOCK] = PRODUCTS_MOCK;
  let stockClient: StockClientStub;

  beforeAll(() => {
    stockClient = new StockClientStub();
    sut = new CreateProductService(stockClient);
  });

  test('Should call stock client with correct values', async () => {
    const clientSpy = jest.spyOn(stockClient, 'emit');

    const createProduct = {
      availableItems: 10,
      product: PRODUCK_MOCK,
    };

    await sut.execute(createProduct);

    expect(clientSpy).toHaveBeenCalledTimes(1);
    expect(clientSpy).toHaveBeenCalledWith('createProduct', createProduct);
  });
});
