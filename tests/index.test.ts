// @ts-check
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("test", async ({ page }) => {
  await expect(page.locator("#greeter")).toContainText("Hello, World!");
});
