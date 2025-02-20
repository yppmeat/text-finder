import { StrictMode } from 'react';
import { Root, createRoot } from 'react-dom/client';
import './styles/style.css';

// 1. consoleにテキストを出力
console.log('Hello Content');

// 2. reactのルートとなる要素を作成
const rootEl: HTMLElement = document.createElement('div');
document.body.insertBefore(rootEl, document.body.firstElementChild);

// 3. reactルートを挿入しページにテキストを表示
const root: Root = createRoot(rootEl);
root.render(
  <StrictMode>
    {/*                                                        ↓適用される ↓ 適用されない ↓ */}
    <h1 style={{ position: 'fixed', zIndex: 99999 }} className="bg-orange text-red-500 w-80">
      Hello Content!
    </h1>
  </StrictMode>
);
