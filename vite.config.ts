import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss(), crx({ manifest })],
  server: {
    port: 5173,
    cors: true,
  },
  // https://github.com/crxjs/chrome-extension-tools/issues/971
  // デフォルトだとwebsocketの通信を許さないので無効化する
  legacy: {
    skipWebSocketTokenCheck: true,
  },
});
