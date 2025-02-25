import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("test", async ({ page }) => {
  const greeter = page.locator("#greeter");
  await expect(greeter).toHaveText("Hello, World!");
});
