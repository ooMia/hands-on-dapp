import { Controller, Get } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('contracts/hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getLinks(): Object {
    return {
      links: [
        '/contracts/hello',
        '/contracts/hello/address',
        '/contracts/hello/name',
      ],
    };
  }

  @Get('address')
  getContractAddress(): Object {
    return {
      address: this.helloService.getContractAddress(),
    };
  }

  @Get('name')
  async getContractName(): Promise<Object> {
    return {
      name: await this.helloService.getContractName(),
    };
  }
}
