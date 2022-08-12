import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: "window",
  },
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  // 代理请求
  // server: {
  //   host: true,
  //   port: 4001,
  //   proxy: {
  //     '/api': {
  //       target: "http://127.0.0.1:10088"
  //     }
  //   }
  // }
})
