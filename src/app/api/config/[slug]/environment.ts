import dotenv from "dotenv";
import { createPublicClient, http } from "viem";
import { privateKeyToAddress } from "viem/accounts";
import { anvil } from "viem/chains";

dotenv.config({ path: "./foundry/.env" });

const client = createPublicClient({
  chain: anvil,
  transport: http(),
});

const deployer = privateKeyToAddress(process.env.PRIVATE_KEY! as `0x${string}`);

const nextPhase = process.env.NEXT_PHASE as string;

export { client, deployer, nextPhase };
