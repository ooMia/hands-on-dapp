import { type Address, createPublicClient, http, webSocket } from "viem";
import { anvil, sepolia } from "viem/chains";

const _config = await fetch("http://localhost:8000/common/config")
  .then((res) => res.json())
  .catch(() => undefined);

// ---------- PUBLIC ----------

export const client = createPublicClient({
  chain: _config?.client?.chain?.id === 31_337 ? anvil : sepolia,
  transport:
    _config?.client?.transport?.key === "websocket" ? webSocket() : http(),
});

export const deployer = (_config?.deployer as Address) ?? "";
