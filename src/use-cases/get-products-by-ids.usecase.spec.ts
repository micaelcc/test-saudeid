import { randomUUID } from 'crypto';
import { GetProductsByIdsUseCase } from './get-products-by-ids.usecase';
import { ProductsRepositoryStub } from './mocks/products-repository-stub';

describe('GetProductsByIdsUseCase', () => {
  let sut: GetProductsByIdsUseCase;
  const PRODUCT_MOCK = { name: 'any_name', unitPrice: 10 };
  const productsRepositoryStub = new ProductsRepositoryStub();

  beforeAll(() => {
    productsRepositoryStub.create(PRODUCT_MOCK);
    sut = new GetProductsByIdsUseCase(productsRepositoryStub);
  });

  test('Should call repository with correct params', async () => {
    const uuid = randomUUID();

    const repositorySpy = jest.spyOn(productsRepositoryStub, 'findManyById');

    await sut.execute([uuid]);

    expect(repositorySpy).toHaveBeenCalledTimes(1);
    expect(repositorySpy).toHaveBeenCalledWith([uuid]);
  });

  test('Should return the correct products', async () => {
    const fakeUuid = 'specified_id';

    const products = await sut.execute([fakeUuid]);

    expect(products).toBeDefined();
    expect(products[0].name).toBe(PRODUCT_MOCK.name);
    expect(products[0].unitPrice).toBe(PRODUCT_MOCK.unitPrice);
    expect(products[0].id).toBe(fakeUuid);
  });
});
