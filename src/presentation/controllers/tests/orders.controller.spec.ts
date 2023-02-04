import { ProductDontExists } from '../../../presentation/errors/ProductDontExists.error';
import { PRODUCTS_MOCK } from '../../../infra/db/typeorm/repositories/tests/mocks/products';
import { CreateOrderUseCase } from '../../../use-cases/create-order.usecase';
import { GetProductsByIdsUseCase } from '../../../use-cases/get-products-by-ids.usecase';
import { OrdersRepositoryStub } from '../../../use-cases/tests/mocks/orders-repository-stub';
import { ProductsRepositoryStub } from '../../../use-cases/tests/mocks/products-repository-stub';
import { OrdersController } from '../orders.controller';
import { HttpException } from '@nestjs/common';
import { CancelOrderUseCase } from '../../../use-cases/cancel-order.usecase';
import { randomUUID } from 'crypto';
import { ORDERS_MOCK } from '../../../infra/db/typeorm/repositories/tests/mocks/orders';
import { UpdateOrderUseCase } from '../../../use-cases/update-order.usecase';
import { GetOrdersUseCase } from '../../../use-cases/get-orders.usecase';
import { GetOrdersValidator } from 'src/presentation/validators/get-orders.validator';

describe('OrdersController', () => {
  let sut: OrdersController;
  const [ORDER_MOCK] = ORDERS_MOCK;
  let ordersRepositoryStub: OrdersRepositoryStub;
  let productsRepositoryStub: ProductsRepositoryStub;
  let createOrderUseCase: CreateOrderUseCase;
  let getProductsByIdsUseCase: GetProductsByIdsUseCase;
  let cancelOrderUseCase: CancelOrderUseCase;
  let updateOrderUseCase: UpdateOrderUseCase;
  let getOrdersUseCase: GetOrdersUseCase;

  beforeEach(() => {
    ordersRepositoryStub = new OrdersRepositoryStub();
    productsRepositoryStub = new ProductsRepositoryStub();

    productsRepositoryStub.create(PRODUCTS_MOCK[0]);

    cancelOrderUseCase = new CancelOrderUseCase(ordersRepositoryStub);

    ordersRepositoryStub.create(ORDER_MOCK);

    createOrderUseCase = new CreateOrderUseCase(ordersRepositoryStub);

    getProductsByIdsUseCase = new GetProductsByIdsUseCase(
      productsRepositoryStub,
    );

    updateOrderUseCase = new UpdateOrderUseCase(ordersRepositoryStub);

    getOrdersUseCase = new GetOrdersUseCase(ordersRepositoryStub);

    sut = new OrdersController(
      createOrderUseCase,
      getProductsByIdsUseCase,
      cancelOrderUseCase,
      updateOrderUseCase,
      getOrdersUseCase,
    );
  });

  describe('create', () => {
    test('Should call get products use case with correct values', async () => {
      const getProductsUseCaseSpyOn = jest.spyOn(
        getProductsByIdsUseCase,
        'execute',
      );
      const ids = ['specified_id'];
      await sut.create({ products: ids });

      expect(getProductsUseCaseSpyOn).toHaveBeenCalledTimes(1);
      expect(getProductsUseCaseSpyOn).toHaveBeenCalledWith(ids);
    });

    test('Should call create order use case with correct values', async () => {
      const createOrderUseCaseSpyOn = jest.spyOn(createOrderUseCase, 'execute');

      jest
        .spyOn(getProductsByIdsUseCase, 'execute')
        .mockReturnValue(Promise.resolve(PRODUCTS_MOCK));

      const ids = ['any_id', 'any_id_1', 'any_id_2'];

      await sut.create({ products: ids });

      expect(createOrderUseCaseSpyOn).toHaveBeenCalledTimes(1);
      expect(createOrderUseCaseSpyOn).toHaveBeenCalledWith(PRODUCTS_MOCK);
    });

    test('Should throw if some product dont exists', async () => {
      jest
        .spyOn(getProductsByIdsUseCase, 'execute')
        .mockImplementationOnce(() => Promise.resolve([]));

      const ids = ['specified_id'];

      try {
        await sut.create({ products: ids });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe(new ProductDontExists().message);
      }
    });
  });

  describe('cancelOrder', () => {
    test('Should call cancelOrder usecase with correct values', async () => {
      const cancelOrderUseCaseSpy = jest
        .spyOn(cancelOrderUseCase, 'execute')
        .mockImplementationOnce(jest.fn());

      const fakeId = randomUUID();

      await sut.cancelOrder({ id: fakeId });

      expect(cancelOrderUseCaseSpy).toHaveBeenCalledTimes(1);
      expect(cancelOrderUseCaseSpy).toBeCalledWith(fakeId);
    });
  });

  describe('updateOrder', () => {
    test('Should call get products use case with correct values', async () => {
      const getProductsUseCaseSpy = jest.spyOn(
        getProductsByIdsUseCase,
        'execute',
      );

      const ids = ['specified_id'];
      await sut.create({ products: ids });

      expect(getProductsUseCaseSpy).toHaveBeenCalledTimes(1);
      expect(getProductsUseCaseSpy).toHaveBeenCalledWith(ids);
    });

    test('Should call update order use case with correct values', async () => {
      const updateOrderUseCaseSpy = jest.spyOn(updateOrderUseCase, 'execute');

      jest
        .spyOn(getProductsByIdsUseCase, 'execute')
        .mockReturnValue(Promise.resolve(PRODUCTS_MOCK));

      const ids = ['any_id', 'any_id_1', 'any_id_2'];

      await sut.update({ products: ids }, { id: 'any_id' });

      expect(updateOrderUseCaseSpy).toHaveBeenCalledTimes(1);
      expect(updateOrderUseCaseSpy).toHaveBeenCalledWith({
        id: 'any_id',
        data: { products: PRODUCTS_MOCK },
      });
    });

    test('Should throw if some product dont exists', async () => {
      jest
        .spyOn(getProductsByIdsUseCase, 'execute')
        .mockImplementationOnce(() => Promise.resolve([]));

      const ids = ['specified_id'];

      try {
        await sut.create({ products: ids });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe(new ProductDontExists().message);
      }
    });
  });

  describe('getAll', () => {
    test('Should call get orders use case with correct values', async () => {
      const getOrdersUseCaseSpy = jest
        .spyOn(getOrdersUseCase, 'execute')
        .mockImplementationOnce(jest.fn());

      const queryParams: GetOrdersValidator = {
        limit: 10,
        orderBy: 'createdAt',
        status: 'ok',
      };

      await sut.getAll(queryParams);

      expect(getOrdersUseCaseSpy).toHaveBeenCalledTimes(1);
      expect(getOrdersUseCaseSpy).toHaveBeenCalledWith({
        filters: queryParams,
      });
    });
  });
});
