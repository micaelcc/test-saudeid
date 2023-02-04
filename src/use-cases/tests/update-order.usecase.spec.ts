import { PRODUCTS_MOCK } from '../../infra/db/typeorm/repositories/tests/mocks/products';
import { ORDERS_MOCK } from '../../infra/db/typeorm/repositories/tests/mocks/orders';
import { UpdateOrderUseCase } from '../update-order.usecase';
import { OrdersRepositoryStub } from './mocks/orders-repository-stub';

describe('UpdateOrderUseCase', () => {
  let sut: UpdateOrderUseCase;
  let ordersRepositoryStub: OrdersRepositoryStub;
  const [ORDER_MOCK] = ORDERS_MOCK;

  beforeEach(() => {
    ordersRepositoryStub = new OrdersRepositoryStub();
    sut = new UpdateOrderUseCase(ordersRepositoryStub);
  });

  test('Should call repository with correct params', async () => {
    const id = ORDER_MOCK.id;
    const totalValue = 1110;
    const repositoryUpdateSpy = jest.spyOn(ordersRepositoryStub, 'update');

    jest
      .spyOn(ordersRepositoryStub, 'update')
      .mockImplementationOnce(jest.fn());

    jest
      .spyOn(ordersRepositoryStub, 'findById')
      .mockReturnValue(Promise.resolve(ORDER_MOCK));

    await sut.execute({ id, data: { products: PRODUCTS_MOCK } });

    expect(repositoryUpdateSpy).toHaveBeenCalledTimes(1);
    expect(repositoryUpdateSpy).toHaveBeenCalledWith({
      ...ORDER_MOCK,
      totalValue,
    });
  });

  test('Should not call update repository if order not exists', async () => {
    const id = ORDER_MOCK.id;

    const repositoryUpdateSpy = jest.spyOn(ordersRepositoryStub, 'update');

    jest.spyOn(ordersRepositoryStub, 'findById').mockReturnValue(undefined);

    await sut.execute({ id, data: { products: PRODUCTS_MOCK } });

    expect(repositoryUpdateSpy).toHaveBeenCalledTimes(0);
  });
});
