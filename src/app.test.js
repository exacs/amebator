import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders amebator text", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/amebator/i);
  expect(linkElement).toBeInTheDocument();
});
