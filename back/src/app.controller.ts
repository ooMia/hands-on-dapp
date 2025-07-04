import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getLinks(): Object {
    return { links: ['/', '/common', '/contracts/hello'] };
  }
}
