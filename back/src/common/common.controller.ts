import { Controller, Get } from '@nestjs/common';
import { Address, PublicClient } from 'viem';
import { CommonService } from './common.service';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get()
  getLinks(): Object {
    return { links: ['/common', '/common/config'] };
  }

  @Get('config')
  getConfig(): { client: PublicClient; deployer: Address } {
    return {
      client: this.commonService.getClient(),
      deployer: this.commonService.getDeployer() as Address,
    };
  }
}
