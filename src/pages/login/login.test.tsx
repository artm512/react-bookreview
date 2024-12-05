import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { Login } from "./index";

test("ログインボタンが描画されている", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  screen.debug();

  expect(screen.getByRole("button", { name: "ログイン" })).toBeInTheDocument();
});
