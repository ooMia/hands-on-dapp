import dotenv from "dotenv";
import { privateKeyToAccount } from "viem/accounts";

dotenv.config({ path: "../foundry/.env" });

const account = privateKeyToAccount(process.env.PRIVATE_KEY! as `0x${string}`);

function login(): string {
  console.info(`Logged in as \x1b[33m${account.address}\x1b[0m`);
  return account.address!;
}

export { login };
