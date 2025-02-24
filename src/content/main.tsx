import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Styles from './components/Styles';
import App from './components/App';
import Panel from './components/Panel';
import './styles/style.css';

const root = document.createElement('div');
root.id = 'text-finder__root';
root.setAttribute('style', 'position: fixed; top: 0; left: 0; z-index: 9999;');
document.body.append(root);

const shadowRoot = root.attachShadow({ mode: 'open' });
createRoot(shadowRoot).render(
  <StrictMode>
    <Styles />
    <App shadowRoot={shadowRoot} />
    <Panel />
  </StrictMode>
);
