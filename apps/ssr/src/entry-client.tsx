import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import "./index.css";

const root = document.getElementById("root");
if (root) {
  hydrateRoot(
    root,
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  );
}
