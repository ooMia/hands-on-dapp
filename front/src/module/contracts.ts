import { type Address } from "viem";

export const helloWorldAddress = await fetch(
  "http://localhost:8000/contracts/hello/address",
)
  .then((res) => res.json().then((data) => data.address as Address))
  .catch(() => undefined);

export const helloWorldName = await fetch(
  "http://localhost:8000/contracts/hello/name",
)
  .then((res) => res.json().then((data) => data.name as string))
  .catch(() => undefined);
