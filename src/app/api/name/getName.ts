import dotenv from "dotenv";
import {
  createPublicClient,
  decodeAbiParameters,
  http,
  toFunctionSelector,
} from "viem";
import { privateKeyToAddress } from "viem/accounts";
import { anvil } from "viem/chains";

dotenv.config({ path: "./foundry/.env" });

async function getName() {
  const client = createPublicClient({
    chain: anvil,
    transport: http(),
  });

  const deployer = privateKeyToAddress(
    process.env.PRIVATE_KEY! as `0x${string}`,
  );

  let _block, _targetHash, _transaction, _targetContract, _resultHex, _name;
  try {
    _block = await client.getBlock({ blockNumber: BigInt(1) });
    _targetHash = _block.transactions[0];
    _transaction = await client.getTransactionReceipt({ hash: _targetHash });
    _targetContract = _transaction.contractAddress;
    _resultHex = await client.call({
      account: deployer,
      data: toFunctionSelector("getName()(string)"),
      to: _targetContract,
    });
    _name = decodeAbiParameters([{ type: "string" }], _resultHex.data!)[0];
    return _name;
  } catch (error) {
    console.error("\x1b[31mError executing getName():\x1b[0m", error);
    console.error(_block);
    console.error(`targetHash: ${_targetHash}`);
    console.error(_transaction);
    console.error(`targetContract: ${_targetContract}`);
    console.error(`resultHex: ${_resultHex}`);
    console.error(`name: ${_name}`);
  }
}

export { getName };
