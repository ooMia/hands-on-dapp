import assert from "node:assert";
import { describe, it, suite, test, todo } from "node:test";
import sum from "./Sum";

suite("Sum:suite", () => {
  test("should add two numbers", () => {
    assert.strictEqual(sum(1, 2), 3);
  });
});

describe("Sum:describe", () => {
  it("should add two numbers", () => {
    assert.strictEqual(sum(1, 2), 3);
  });
});

describe("Sum", () => {
  it("-", () => {
    todo(
      "This test is not implemented yet. It will pass once the implementation is done.",
    );
  });
});
