import { CreateProductUseCase } from '../create-product.usecase';
import { PRODUCTS_MOCK } from './mocks/products';
import { ProductsRepositoryStub } from './mocks/products.repository';

describe('CreateProductUseCase', () => {
  let sut: CreateProductUseCase;
  const [PRODUCK_MOCK] = PRODUCTS_MOCK;

  let productsRepository: ProductsRepositoryStub;

  beforeAll(() => {
    productsRepository = new ProductsRepositoryStub();
    sut = new CreateProductUseCase(productsRepository);
  });

  test('Should call repository with correct params', async () => {
    const repositorySpy = jest.spyOn(productsRepository, 'create');

    const createProduct = {
      availableItems: 10,
      product: PRODUCK_MOCK,
    };

    await sut.execute(createProduct);

    expect(repositorySpy).toHaveBeenCalledTimes(1);
    expect(repositorySpy).toHaveBeenCalledWith({
      productId: PRODUCK_MOCK.id,
      availableItems: createProduct.availableItems,
    });
  });
});
