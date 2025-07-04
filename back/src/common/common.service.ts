import { Injectable } from '@nestjs/common';
import { Address, PublicClient } from 'viem';
import { client, deployer, helloWorldContractAddress } from './util';
@Injectable()
export class CommonService {
  getHello(): string {
    return 'Hello World!';
  }

  getClient(): PublicClient {
    return client;
  }

  getDeployer(): Address {
    return deployer;
  }

  getHelloWorldContractAddress(): Address {
    return helloWorldContractAddress;
  }
}
