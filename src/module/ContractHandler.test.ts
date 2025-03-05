import assert from "node:assert";
import { suite, test } from "node:test";
import { login } from "./ContractHandler";

suite("Login", () => {
  const account = "0x4262Aa56B97f776C075883b6077719ca3B997023";

  test("should return registered account", () => {
    assert.strictEqual(login(), account);
  });
});
