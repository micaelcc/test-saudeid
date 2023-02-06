import { CreateProductUseCase } from '../create-product.usecase';
import { ProductsRepositoryStub } from './mocks/products-repository-stub';

describe('CreateProductUseCase', () => {
  let sut: CreateProductUseCase;

  let productsRepository: ProductsRepositoryStub;

  beforeAll(() => {
    productsRepository = new ProductsRepositoryStub();
    sut = new CreateProductUseCase(productsRepository);
  });

  test('Should call repository with correct params', async () => {
    const repositorySpy = jest.spyOn(productsRepository, 'create');

    await sut.execute({
      name: 'fakeName',
      unitPrice: 10,
    });

    expect(repositorySpy).toHaveBeenCalledTimes(1);
    expect(repositorySpy).toHaveBeenCalledWith({
      name: 'fakeName',
      unitPrice: 10,
    });
  });
});
