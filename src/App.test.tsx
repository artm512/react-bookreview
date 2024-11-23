import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import App from "./App";

test("ログインボタンが描画されている", () => {
  render(<App />);
  screen.debug();

  expect(screen.getByRole("button", { name: "ログイン" })).toBeInTheDocument();
});
