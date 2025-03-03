import dotenv from "dotenv";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { createPublicClient, http } from "viem";
import { privateKeyToAddress } from "viem/accounts";
import { anvil, sepolia } from "viem/chains";

dotenv.config({ path: "./foundry/.env" });

const client = createPublicClient({
  chain: isDev() ? anvil : sepolia,
  transport: http(),
});

const deployer = privateKeyToAddress(process.env.PRIVATE_KEY! as `0x${string}`);

const nextPhase = process.env.NEXT_PHASE as string;

function isDev() {
  return process.env.NEXT_PHASE === PHASE_DEVELOPMENT_SERVER;
}

export { client, deployer, isDev, nextPhase };
