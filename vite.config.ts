import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    // สำหรับ GitHub Pages (project site) ต้อง serve จาก /<ชื่อ repo>/
    // ตั้งค่า VITE_BASE_PATH ตอน build เช่น VITE_BASE_PATH=/sila-plan-app/ npm run build
    // ถ้าไม่ตั้งค่า จะใช้ '/' เหมือนเดิม (สำหรับรันบนเครื่อง/โดเมนของตัวเอง)
    base: process.env.VITE_BASE_PATH || '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
