import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { Login } from "./index";

test("ログインボタンが描画されている", () => {
  render(<Login />);
  screen.debug();

  expect(screen.getByRole("button", { name: "ログイン" })).toBeInTheDocument();
});
