import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Render } from "render";

it("renders without crashing", () => {
  const div = document.createElement("div");
  Render(<App />, div);
});
