import { ORDERS_MOCK } from '@/infra/db/typeorm/repositories/tests/mocks/orders';
import { GetOrdersDTO } from '@/shared/dtos/get-orders.dto';
import { GetOrdersUseCase } from '../get-orders.usecase';
import { OrdersRepositoryStub } from './mocks/orders-repository-stub';

describe('GetOrdersUseCase', () => {
  let sut: GetOrdersUseCase;
  const ordersRepositoryStub = new OrdersRepositoryStub();
  const payload: GetOrdersDTO = { filters: { status: 'ok' } };

  beforeAll(() => {
    ordersRepositoryStub.create(ORDERS_MOCK[0]);
    ordersRepositoryStub.create(ORDERS_MOCK[1]);
    sut = new GetOrdersUseCase(ordersRepositoryStub);
  });

  test('Should call repository with correct params', async () => {
    const repositorySpy = jest.spyOn(ordersRepositoryStub, 'getAll');

    await sut.execute(payload);

    expect(repositorySpy).toHaveBeenCalledTimes(1);
    expect(repositorySpy).toHaveBeenCalledWith(payload);
  });

  test('Should return the correct orders', async () => {
    const orders = await sut.execute(payload);

    expect(orders).toBeDefined();
    expect(orders.length).toBe(1);
    expect(orders[0].status).toBe('ok');
  });
});
