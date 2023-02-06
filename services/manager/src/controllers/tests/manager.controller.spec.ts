import { PRODUCTS_MOCK } from '@/services/tests/mocks/products';

import { ManagerController } from '../manager.controller';
import { CreateProductService } from '@/services/create-product.service';
import { UpdateStockService } from '@/services/update-stock.service';
import { StockClientStub } from '@/services/tests/mocks/stock-client-stub';

describe('ManagerController', () => {
  let sut: ManagerController;
  const [PRODUCT_MOCK] = PRODUCTS_MOCK;
  let createProductService: CreateProductService;
  let updateStockService: UpdateStockService;
  let stockClientStub: StockClientStub;

  beforeEach(() => {
    stockClientStub = new StockClientStub();

    updateStockService = new UpdateStockService(stockClientStub);
    createProductService = new CreateProductService(stockClientStub);

    jest.spyOn(updateStockService, 'execute').mockImplementation(jest.fn());
    jest.spyOn(createProductService, 'execute').mockImplementation(jest.fn());

    sut = new ManagerController(updateStockService, createProductService);
  });

  describe('orderCreated', () => {
    test('Should call update stock service with correct values', async () => {
      const updateStockSpy = jest.spyOn(updateStockService, 'execute');

      const orderCreatedPayload = {
        orderId: 'any_id',
        products: PRODUCTS_MOCK,
      };

      await sut.orderUpdated(orderCreatedPayload);

      expect(updateStockSpy).toHaveBeenCalledTimes(1);
      expect(updateStockSpy).toHaveBeenCalledWith({
        addedProducts: PRODUCTS_MOCK,
        removedProducts: [],
      });
    });
  });

  describe('orderCanceled', () => {
    test('Should call update stock service with correct values', async () => {
      const updateStockSpy = jest.spyOn(updateStockService, 'execute');

      const orderCreatedPayload = {
        orderId: 'any_id',
        products: PRODUCTS_MOCK,
      };

      await sut.orderCanceled(orderCreatedPayload);

      expect(updateStockSpy).toHaveBeenCalledTimes(1);
      expect(updateStockSpy).toHaveBeenCalledWith({
        addedProducts: [],
        removedProducts: PRODUCTS_MOCK,
      });
    });
  });

  describe('productCreated', () => {
    test('Should call create product service with correct values', async () => {
      const createProductSpy = jest.spyOn(createProductService, 'execute');

      const createProductPayload = {
        product: PRODUCT_MOCK,
        availableItems: 10,
      };

      await sut.productCreated(createProductPayload);

      expect(createProductSpy).toHaveBeenCalledTimes(1);
      expect(createProductSpy).toHaveBeenCalledWith(createProductPayload);
    });
  });
});
