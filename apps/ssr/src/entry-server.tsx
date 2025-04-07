import { StrictMode } from "react";
import App from "./App";
import { renderToString } from "react-dom/server";

export function render() {
  const appHtml = renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
  return { appHtml };
}
