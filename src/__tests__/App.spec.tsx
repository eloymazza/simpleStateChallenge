import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";

import App from "../App";

describe("App", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a heading", () => {
    render(<App />);
    screen.getByText("Hello World");
  });
});
