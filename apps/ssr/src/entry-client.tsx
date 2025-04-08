import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const root = document.getElementById("root");
console.log("ssr>>", import.meta.env.SSR);
if (root) {
  hydrateRoot(
    root,
    <StrictMode>
      <App />
    </StrictMode>
  );
}
