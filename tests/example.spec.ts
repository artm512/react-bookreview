import { test, expect } from "@playwright/test";

const baseUrl = "http://localhost:5173/login";

test("フォームに入力がなかった場合、エラーを表示する。", async ({ page }) => {
  await page.goto(baseUrl);

  // ログインボタンを押す
  await page.getByRole("button", { name: "ログイン" }).click();

  // エラー文言が表示されることを確認
  await expect(
    page.getByText("メールアドレスを入力してください。")
  ).toBeVisible();
  await expect(page.getByText("パスワードを入力してください。")).toBeVisible();
});

test("フォームに入力があった場合、エラーを表示しない", async ({ page }) => {
  await page.goto(baseUrl);

  // フォームに入力
  await page.getByLabel("メールアドレス").fill("test@xxx.com");
  await page.getByLabel("パスワード").fill("password");

  // エラー文言が表示されないことを確認
  await expect(
    page.getByText("メールアドレスを入力してください。")
  ).not.toBeVisible();
  await expect(
    page.getByText("パスワードを入力してください。")
  ).not.toBeVisible();
});
