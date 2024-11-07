import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    proxy: {
      '/dev': {
        target: 'https://x8txu4fs3e.execute-api.ap-northeast-2.amazonaws.com/',
        // target: 'https://noi72lets6.execute-api.us-east-1.amazonaws.com/',
        // target: 'https://t7fssxji8a.execute-api.ap-northeast-2.amazonaws.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});