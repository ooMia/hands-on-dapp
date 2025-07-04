import { config } from 'dotenv';
import {
  type Address,
  createPublicClient,
  getContractAddress,
  http,
} from 'viem';
import { privateKeyToAddress } from 'viem/accounts';
import { anvil, sepolia } from 'viem/chains';

config({ path: '../foundry/.env' });

function _withMemoization<T>(factory: () => T): () => T {
  let cached: T | undefined;
  return () => {
    if (cached === undefined) {
      cached = factory();
    }
    return cached;
  };
}

function _isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

// ---------- PUBLIC API ----------

export function max(a: bigint, b: bigint): bigint {
  return a > b ? a : b;
}

export const client = _withMemoization(() =>
  createPublicClient({
    chain: _isDev() ? anvil : sepolia,
    transport: http(),
  }),
)();

export const deployer = _withMemoization(() =>
  _isDev()
    ? privateKeyToAddress(process.env.ANVIL_PRIVATE_KEY! as `0x${string}`)
    : privateKeyToAddress(process.env.PRIVATE_KEY! as `0x${string}`),
)();

// ---------- Contract Address ----------

export const helloWorldContractAddress = _withMemoization(() =>
  _isDev()
    ? getContractAddress({
        from: deployer,
        nonce: 0n, // assume it is deployed at nonce 0 for development
      })
    : (process.env.HELLO_WORLD_CONTRACT_ADDRESS! as Address),
)();
