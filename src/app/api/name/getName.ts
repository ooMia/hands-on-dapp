import { client, deployer } from "@/config/[slug]/environment";
import { decodeAbiParameters, toFunctionSelector } from "viem";

async function getName() {
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

    console.debug(_block);
    console.debug(`targetHash: ${_targetHash}`);
    console.debug(_transaction);
    console.debug(`targetContract: ${_targetContract}`);
    console.debug(`resultHex: ${_resultHex}`);
    console.debug(`name: ${_name}`);
  }
}

export { getName };
