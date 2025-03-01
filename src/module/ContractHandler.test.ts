import assert from "node:assert";
import { suite, test } from "node:test";
import { login } from "./ContractHandler";

suite("Login", () => {
  const account = "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720";

  test("should return registered account", () => {
    assert.strictEqual(login(), account);
  });
});
