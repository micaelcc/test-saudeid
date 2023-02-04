import { PRODUCTS_MOCK } from '../../infra/db/typeorm/repositories/tests/mocks/products';
import { CreateOrderUseCase } from '../create-order.usecase';
import { OrdersRepositoryStub } from './mocks/orders-repository-stub';

describe('CreateOrderUseCase', () => {
  let sut: CreateOrderUseCase;

  const ordersRepositoryStub = new OrdersRepositoryStub();

  beforeAll(() => {
    sut = new CreateOrderUseCase(ordersRepositoryStub);
  });

  test('Should call repository with correct params', async () => {
    const totalValue = 1110;

    const repositorySpy = jest.spyOn(ordersRepositoryStub, 'create');

    await sut.execute(PRODUCTS_MOCK);

    expect(repositorySpy).toHaveBeenCalledTimes(1);
    expect(repositorySpy).toHaveBeenCalledWith({
      products: PRODUCTS_MOCK,
      status: 'ok',
      totalValue,
    });
  });
});
