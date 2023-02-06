import { ClientProxy } from '@nestjs/microservices';

class StockClientStub extends ClientProxy {
  connect(): Promise<any> {
    return;
  }
  close() {
    return;
  }
  protected publish(): () => void {
    return;
  }
  protected dispatchEvent<T = any>(): Promise<T> {
    return;
  }
}

export { StockClientStub };
