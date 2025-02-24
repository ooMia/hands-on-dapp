import { AbiCoder } from "ethers";

async function fetchJsonRpc(method, params) {
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
  try {
    const block = await fetchJsonRpc("eth_getBlockByNumber", ["0x1", false]);
    const targetHash = block.transactions[0];

    const transaction = await fetchJsonRpc("eth_getTransactionReceipt", [
      targetHash,
    ]);
    const targetContract = transaction.contractAddress;

    const resultBytes = await fetchJsonRpc("eth_call", [
      {
        to: targetContract,
        from: "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720", // 9th admin account
        input: "0x17d7de7c", // cast sig "getName()"
      },
    ]);
    const name = new AbiCoder().decode(["string"], resultBytes)[0];
    return name;
  } catch (error) {
    console.error("Error executing JSON-RPC calls:", error);

    // Debugging
    console.log(block);
    console.log(`targetHash: ${targetHash}`);
    console.log(transaction);
    console.log(`targetContract: ${targetContract}`);
    console.log(`resultBytes: ${resultBytes}`);
    console.log(`name: ${name}`);
  }
}

export { getName };
