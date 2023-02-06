import { MongoProductsRepository } from '../product.repository';
import mongoose, { Connection } from 'mongoose';
import { mongodbConfig } from '../../config';

describe('ProductsRepository', () => {
  let sut: MongoProductsRepository;
  let connection: Connection;

  beforeAll(async () => {
    mongoose.set('strictQuery', false);
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

  describe('updateMany', () => {
    it('Should call collection().updateMany with correct values', async () => {
      const updateManySpy = jest
        .spyOn(connection.collection('products'), 'updateMany')
        .mockImplementationOnce(jest.fn());

      const ids = ['id_1', 'id_2'];

      await sut.updateMany(ids, 'decrement');

      expect(updateManySpy).toHaveBeenCalledTimes(1);
      expect(updateManySpy).toHaveBeenCalledWith(
        {
          productId: {
            $in: ids,
          },
        },
        {
          $inc: {
            availableItems: -1,
          },
        },
      );
    });
  });
});
