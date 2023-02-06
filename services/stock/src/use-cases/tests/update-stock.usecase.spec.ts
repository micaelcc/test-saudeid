import { UpdateStockRequest } from '@/presentation/controllers/stock.controller';
import { UpdateStockUseCase } from '../update-stock.usecase';
import { PRODUCTS_MOCK } from './mocks/products';
import { ProductsRepositoryStub } from './mocks/products.repository';

describe('UpdateStockUseCase', () => {
  let sut: UpdateStockUseCase;

  let productsRepository: ProductsRepositoryStub;

  beforeEach(() => {
    productsRepository = new ProductsRepositoryStub();
    sut = new UpdateStockUseCase(productsRepository);
  });

  test('Should call repository with correct params when products are removed', async () => {
    const repositorySpy = jest.spyOn(productsRepository, 'updateMany');

    const updateStockPayload: UpdateStockRequest = {
      addedProducts: [],
      removedProducts: PRODUCTS_MOCK,
    };

    const ids = PRODUCTS_MOCK.map((product) => product.id);

    await sut.execute(updateStockPayload);

    expect(repositorySpy).toHaveBeenCalledTimes(1);
    expect(repositorySpy).toHaveBeenCalledWith(ids, 'increment');
  });

  test('Should call repository with correct params when products are added', async () => {
    const repositorySpy = jest.spyOn(productsRepository, 'updateMany');

    const updateStockPayload: UpdateStockRequest = {
      addedProducts: PRODUCTS_MOCK,
      removedProducts: [],
    };

    const ids = PRODUCTS_MOCK.map((product) => product.id);

    await sut.execute(updateStockPayload);

    expect(repositorySpy).toHaveBeenCalledTimes(1);
    expect(repositorySpy).toHaveBeenCalledWith(ids, 'decrement');
  });
});
