import { PRODUCTS_MOCK } from '@/infra/db/typeorm/repositories/tests/mocks/products';
import { ProductsRepositoryStub } from '@/use-cases/tests/mocks/products-repository-stub';
import { ClientKafka } from '@nestjs/microservices';
import { CreateProductUseCase } from '@/use-cases/create-product.usecase';
import { ProductsController } from '../products.controller';

describe('ProductsController', () => {
  let sut: ProductsController;
  const [PRODUCT_MOCK] = PRODUCTS_MOCK;
  let createProductUseCase: CreateProductUseCase;
  let productsRepositoryStub: ProductsRepositoryStub;
  let clientKafka: ClientKafka;

  beforeEach(() => {
    productsRepositoryStub = new ProductsRepositoryStub();
    createProductUseCase = new CreateProductUseCase(productsRepositoryStub);

    clientKafka = new ClientKafka({});

    sut = new ProductsController(createProductUseCase, clientKafka);

    jest.spyOn(clientKafka, 'emit').mockImplementationOnce(jest.fn());
  });

  describe('create', () => {
    test('Should call create product use case with correct values', async () => {
      const createProductUseCaseSpyOn = jest.spyOn(
        createProductUseCase,
        'execute',
      );

      const fakeProductRequest = {
        availableItems: 10,
        name: 'fakeName',
        unitPrice: 10,
      };

      await sut.create(fakeProductRequest);

      expect(createProductUseCaseSpyOn).toHaveBeenCalledTimes(1);
      expect(createProductUseCaseSpyOn).toHaveBeenCalledWith({
        name: fakeProductRequest.name,
        unitPrice: fakeProductRequest.unitPrice,
      });
    });

    test('Should publish message on kafka client on success', async () => {
      const clientKafkaSpy = jest.spyOn(clientKafka, 'emit');

      jest
        .spyOn(createProductUseCase, 'execute')
        .mockReturnValueOnce(Promise.resolve(PRODUCT_MOCK));

      const fakeProductRequest = {
        availableItems: 10,
        name: 'fakeName',
        unitPrice: 10,
      };

      await sut.create(fakeProductRequest);

      expect(clientKafkaSpy).toHaveBeenCalledTimes(1);
      expect(clientKafkaSpy).toHaveBeenCalledWith('product.created', {
        product: PRODUCT_MOCK,
        availableItems: fakeProductRequest.availableItems,
      });
    });
  });
});
