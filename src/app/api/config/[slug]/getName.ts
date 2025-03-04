import { client, deployer } from "@/config/[slug]/environment";
import { decodeAbiParameters, getAddress, toFunctionSelector } from "viem";

async function getName() {
  let _targetContract, _resultHex, _name;
  try {
    // TODO: automatically tracking the contract address by using proxy or factory pattern
    _targetContract = getAddress("0xc2baed95c726af81d285411979d7713e6abdcd4f");
    _resultHex = await client.call({
      account: deployer,
      data: toFunctionSelector("getName()(string)"),
      to: _targetContract,
    });
    _name = decodeAbiParameters([{ type: "string" }], _resultHex.data!)[0];
    return _name;
  } catch (error) {
    console.error("\x1b[31mError executing getName():\x1b[0m", error);

    console.debug(`targetContract: ${_targetContract}`);
    console.debug(`resultHex: ${_resultHex}`);
    console.debug(`name: ${_name}`);
    return "Error";
  }
}

export { getName };
