import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("test", async ({ page }) => {
  const greeter = page.locator("#greeter");
  // TODO: enable test after deploy smart contract on testnet
  //   await expect(greeter).toHaveText("Hello, World!");
});
