import { ORDERS_MOCK } from '@/infra/db/typeorm/repositories/tests/mocks/orders';
import { CancelOrderUseCase } from '../cancel-order.usecase';
import { OrdersRepositoryStub } from './mocks/orders-repository-stub';

describe('CancelOrderUseCase', () => {
  let sut: CancelOrderUseCase;
  let ordersRepositoryStub: OrdersRepositoryStub;
  const [ORDER_MOCK] = ORDERS_MOCK;

  beforeEach(() => {
    ordersRepositoryStub = new OrdersRepositoryStub();
    sut = new CancelOrderUseCase(ordersRepositoryStub);
  });

  test('Should call repository with correct params', async () => {
    const id = ORDER_MOCK.id;

    const repositoryUpdateSpy = jest.spyOn(ordersRepositoryStub, 'update');

    jest
      .spyOn(ordersRepositoryStub, 'update')
      .mockImplementationOnce(jest.fn());

    jest
      .spyOn(ordersRepositoryStub, 'findById')
      .mockReturnValue(Promise.resolve(ORDER_MOCK));

    await sut.execute(id);

    expect(repositoryUpdateSpy).toHaveBeenCalledTimes(1);
    expect(repositoryUpdateSpy).toHaveBeenCalledWith({
      ...ORDER_MOCK,
      status: 'canceled',
    });
  });

  test('Should not call update repository if order not exists', async () => {
    const id = ORDER_MOCK.id;

    const repositoryUpdateSpy = jest.spyOn(ordersRepositoryStub, 'update');

    jest.spyOn(ordersRepositoryStub, 'findById').mockReturnValue(undefined);

    await sut.execute(id);

    expect(repositoryUpdateSpy).toHaveBeenCalledTimes(0);
  });
});
