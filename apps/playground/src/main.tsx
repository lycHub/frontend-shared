import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './App.tsx'
import { addCollection } from '@iconify-icon/react';

fetch('/public/zs.json').then(response => response.json()).then(res => {
  addCollection(res);
});

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <App />
  </StrictMode>
)
