import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const proxyTarget = mode === 'production' 
    ? 'https://workspace-odyssey.onrender.com'  // points to the production url
    : 'http://localhost:8080';                  // defaults to development url if we're not in production

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/reviews': proxyTarget,
        '/api': proxyTarget
      }
    }
  };
});
