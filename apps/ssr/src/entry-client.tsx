import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById("root");
if (root) {
  if (import.meta.env.VITE_MODE === "ssr") {
    hydrateRoot(root,  <StrictMode>
      <App />
    </StrictMode>);
  } else {
    createRoot(root).render( <StrictMode>
      <App />
    </StrictMode>);
  }
}