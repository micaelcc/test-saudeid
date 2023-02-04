import { EntityManager } from 'typeorm';
import { DATA_SOURCE_MOCK } from '../mocks/data-source';
import { ORDERS_MOCK } from '../mocks/orders';
import { TypeOrmOrderRepository } from './order.repository';
import { Order } from '../../../../domain/orders/order.entity';

describe('OrdersRepository', () => {
  let sut: TypeOrmOrderRepository;
  const entityManagerMock = new EntityManager(DATA_SOURCE_MOCK);

  beforeEach(() => {
    sut = new TypeOrmOrderRepository(entityManagerMock);
  });

  describe('getAll', () => {
    beforeAll(() => {
      jest
        .spyOn(entityManagerMock, 'find')
        .mockReturnValue(Promise.resolve(ORDERS_MOCK));
    });

    it('Should return all orders', async () => {
      const orders = await sut.getAll();

      expect(orders).toBeDefined();
      expect(orders).toEqual(ORDERS_MOCK);
    });
  });

  describe('create', () => {
    beforeAll(() => {
      jest.spyOn(entityManagerMock, 'save').mockImplementation(jest.fn());
    });

    it('Should call manager.save with correct values', async () => {
      const [order] = ORDERS_MOCK;

      await sut.create(order);

      const saveSpy = jest.spyOn(entityManagerMock, 'save');

      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith(Order, order);
    });
  });

  describe('update', () => {
    beforeAll(() => {
      jest.spyOn(entityManagerMock, 'update').mockImplementation(jest.fn());
    });

    it('Should call manager.update with correct values', async () => {
      const [order] = ORDERS_MOCK;

      await sut.update(order);

      const updateSpy = jest.spyOn(entityManagerMock, 'update');

      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledWith(Order, order.id, order);
    });
  });
});
