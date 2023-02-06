import { CreateProductUseCase } from '@/use-cases/create-product.usecase';
import { StockController } from '../stock.controller';
import { UpdateStockUseCase } from '@/use-cases/update-stock.usecase';
import { PRODUCTS_MOCK } from '@/use-cases/tests/mocks/products';
import { ProductsRepositoryStub } from '@/use-cases/tests/mocks/products.repository';

describe('StockController', () => {
  let sut: StockController;
  const [PRODUCT_MOCK] = PRODUCTS_MOCK;
  let updateStockUseCase: UpdateStockUseCase;
  let createProductUseCase: CreateProductUseCase;
  let productsRepositoryStub: ProductsRepositoryStub;

  beforeEach(() => {
    productsRepositoryStub = new ProductsRepositoryStub();

    createProductUseCase = new CreateProductUseCase(productsRepositoryStub);

    updateStockUseCase = new UpdateStockUseCase(productsRepositoryStub);

    sut = new StockController(updateStockUseCase, createProductUseCase);
  });

  describe('create', () => {
    test('Should call create product use case with correct values', async () => {
      const createProductUseCaseSpyOn = jest.spyOn(
        createProductUseCase,
        'execute',
      );

      const fakeProductRequest = {
        availableItems: 10,
        product: PRODUCT_MOCK,
      };

      await sut.create(fakeProductRequest);

      expect(createProductUseCaseSpyOn).toHaveBeenCalledTimes(1);
      expect(createProductUseCaseSpyOn).toHaveBeenCalledWith(
        fakeProductRequest,
      );
    });
  });

  describe('update', () => {
    test('Should call update stock use case with correct values', async () => {
      const updateStockUseCaseSpyOn = jest.spyOn(updateStockUseCase, 'execute');

      const fakeUpdateStockRequest = {
        addedProducts: [],
        removedProducts: [],
      };

      await sut.update(fakeUpdateStockRequest);

      expect(updateStockUseCaseSpyOn).toHaveBeenCalledTimes(1);
      expect(updateStockUseCaseSpyOn).toHaveBeenCalledWith(
        fakeUpdateStockRequest,
      );
    });
  });
});
