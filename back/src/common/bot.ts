import { Logger } from '@nestjs/common';
import { GetLogsReturnType, parseAbiItem, stringify } from 'viem';
import { client, helloWorldContractAddress, max } from './util';
class Bot {
  eventAbi: any;
  private readonly logger = new Logger(Bot.name, { timestamp: true });

  constructor() {
    this.eventAbi = parseAbiItem(
      'event Register(address indexed _address, string _name)',
    );
    client.watchEvent({
      event: this.eventAbi,
      address: helloWorldContractAddress,
      // [ ] TODO implement event logger
      onLogs: (logs: any) => {
        this.logger.log('New event detected:');
        this.logger.log(stringify(logs, null, 2));
      },
    });
  }

  async updateBlockNumber(): Promise<{ from: bigint; to: bigint }> {
    const currentBlock = await client.getBlockNumber();
    return {
      from: max(currentBlock - 20n, 0n),
      to: currentBlock,
    };
  }

  async getLogs(): Promise<GetLogsReturnType> {
    const blockRange = await this.updateBlockNumber();

    return await client.getLogs({
      event: this.eventAbi,
      fromBlock: blockRange.from,
      toBlock: blockRange.to,
    });
  }
}

export default new Bot();
