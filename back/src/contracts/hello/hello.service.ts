import { Injectable } from '@nestjs/common';
import { Address, decodeAbiParameters, toFunctionSelector } from 'viem';
import { CommonService } from '@/common/common.service';

@Injectable()
export class HelloService {
  constructor(private readonly commonService: CommonService) {}

  getContractAddress(): Address {
    return this.commonService.getHelloWorldContractAddress();
  }

  async getContractName(): Promise<string> {
    const client = this.commonService.getClient();
    const deployer = this.commonService.getDeployer();
    const helloWorldContractAddress =
      this.commonService.getHelloWorldContractAddress();

    try {
      const callResult = await client.call({
        account: deployer,
        data: toFunctionSelector('getName()(string)'),
        to: helloWorldContractAddress,
      });

      if (!callResult?.data) {
        throw new Error('No data returned from contract call');
      }

      const [contractName] = decodeAbiParameters(
        [{ type: 'string' }],
        callResult.data,
      );

      return contractName;
    } catch (error) {
      console.error('Error executing getName():', error);
      console.debug(`targetContract: ${helloWorldContractAddress}`);
      throw new Error('Failed to get contract name'); // Controller에서 HTTP 에러로 변환됨
    }
  }
}
