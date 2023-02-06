import { MongoProductsRepository } from '../product.repository';
import mongoose, { Connection } from 'mongoose';
import { mongodbConfig } from '../../config';

describe('ProductsRepository', () => {
  let sut: MongoProductsRepository;
  let connection: Connection;

  beforeAll(async () => {
    await mongoose.connect(mongodbConfig.MONGO_URL_TEST, {});
    connection = mongoose.connection;

    sut = new MongoProductsRepository(connection);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('create', () => {
    it('Should call collection().insertOne with correct values', async () => {
      const insertOneSpy = jest
        .spyOn(connection.collection('products'), 'insertOne')
        .mockImplementationOnce(jest.fn());

      await sut.create({
        availableItems: 10,
        productId: 'fakeId',
      });

      expect(insertOneSpy).toHaveBeenCalledTimes(1);
      expect(insertOneSpy).toHaveBeenCalledWith({
        availableItems: 10,
        productId: 'fakeId',
      });
    });
  });
});
