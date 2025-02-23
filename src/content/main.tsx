import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import style from './styles/style.css';

const root = document.createElement('div');
root.id = 'text-finder__root';
root.attachShadow({ mode: 'open' });
const shadowRoot = root.shadowRoot!;
document.body.append(root);

createRoot(shadowRoot).render(
  <StrictMode>
    <style>{style}</style>
    <App />
  </StrictMode>
);