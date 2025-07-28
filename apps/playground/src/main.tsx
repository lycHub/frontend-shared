import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import App from "./App.tsx";
import { addCollection } from "@iconify-icon/react";
import iconData from "@frontend-shared/icons/icon-data.json";
import "./i18n";

/* fetch('/public/zs.json').then(response => response.json()).then(res => {
  addCollection(res);
}); */

addCollection(iconData);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
