import { AbiCoder } from "ethers";

async function fetchJsonRpc(method: string, params: unknown[]) {
  // TODO: use env to set the URL to separate dev/prod
  const response = await fetch("http://localhost:8545", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: method,
      params: params,
      id: 1,
    }),
  });
  const json = await response.json();
  return json.result;
}

async function getName() {
  let _block, _targetHash, _transaction, _targetContract, _resultBytes, _name;
  try {
    _block = await fetchJsonRpc("eth_getBlockByNumber", ["0x1", false]);
    _targetHash = _block.transactions[0];
    _transaction = await fetchJsonRpc("eth_getTransactionReceipt", [
      _targetHash,
    ]);
    _targetContract = _transaction.contractAddress;
    _resultBytes = await fetchJsonRpc("eth_call", [
      {
        to: _targetContract,
        from: "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720", // 9th admin account
        input: "0x17d7de7c", // cast sig "getName()"
      },
    ]);
    _name = new AbiCoder().decode(["string"], _resultBytes)[0];
    return _name;
  } catch (error) {
    console.error("Error executing JSON-RPC calls:", error);
    // Debugging
    console.log(_block);
    console.log(`targetHash: ${_targetHash}`);
    console.log(_transaction);
    console.log(`targetContract: ${_targetContract}`);
    console.log(`resultBytes: ${_resultBytes}`);
    console.log(`name: ${_name}`);
  }
}

export { fetchJsonRpc, getName };
