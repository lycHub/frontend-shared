import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const LoadedState = window.__LOADED_STATE__;

const root = document.getElementById("root");
console.log("ssr>>", import.meta.env.SSR);
if (root) {
  hydrateRoot(
    root,
    <StrictMode>
      <App loadedData={LoadedState} />
    </StrictMode>
  );
}
