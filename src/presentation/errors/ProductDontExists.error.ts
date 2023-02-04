import { HttpException, HttpStatus } from '@nestjs/common';

class ProductDontExists extends HttpException {
  constructor() {
    super('some product dont exists!', HttpStatus.BAD_REQUEST);
  }
}

export { ProductDontExists };
