import { EntityManager, In } from 'typeorm';
import { DATA_SOURCE_MOCK } from './mocks/data-source';
import { TypeOrmProductsRepository } from '../product.repository';
import { PRODUCTS_MOCK } from './mocks/products';
import { Product } from '../../../../../domain/products/product.entity';

describe('ProductsRepository', () => {
  let sut: TypeOrmProductsRepository;
  const entityManagerMock = new EntityManager(DATA_SOURCE_MOCK);

  beforeEach(() => {
    sut = new TypeOrmProductsRepository(entityManagerMock);
  });

  describe('getAll', () => {
    beforeAll(() => {
      jest
        .spyOn(entityManagerMock, 'find')
        .mockReturnValue(Promise.resolve(PRODUCTS_MOCK));
    });

    it('Should return all products', async () => {
      const products = await sut.getAll();

      expect(products).toBeDefined();
      expect(products).toEqual(PRODUCTS_MOCK);
    });
  });

  describe('create', () => {
    beforeAll(() => {
      jest.spyOn(entityManagerMock, 'save').mockImplementation(jest.fn());
    });

    it('Should call manager.save with correct values', async () => {
      const [product] = PRODUCTS_MOCK;

      await sut.create(product);

      const saveSpy = jest.spyOn(entityManagerMock, 'save');

      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith(Product, product);
    });
  });

  describe('findManyByIds', () => {
    beforeAll(() => {
      jest.spyOn(entityManagerMock, 'findBy').mockImplementation(jest.fn());
    });

    it('Should call manager.findBy with correct values', async () => {
      const ids = ['specific_id'];

      await sut.findManyById(ids);

      const findBySpy = jest.spyOn(entityManagerMock, 'findBy');

      expect(findBySpy).toHaveBeenCalledTimes(1);
      expect(findBySpy).toHaveBeenCalledWith(Product, { id: In(ids) });
    });
  });
});
