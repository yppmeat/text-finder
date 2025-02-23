import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import manifest from './manifest.json';

export default defineConfig({
  plugins: [react(), tailwindcss(), crx({ manifest })],
  server: {
    port: 5174,
  },
  // https://github.com/crxjs/chrome-extension-tools/issues/971
  // デフォルトだとwebsocketの通信を許さないので無効化する
  legacy: {
    skipWebSocketTokenCheck: true,
  },
});
