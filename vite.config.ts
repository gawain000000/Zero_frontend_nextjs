/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePluginFakeServer } from 'vite-plugin-fake-server'
import dayjs from 'dayjs'

import { dependencies, devDependencies, name, version } from './package.json'

const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
}

// https://vitejs.dev/config/
export default defineConfig({
  // eslint-disable-next-line node/prefer-global/process
  base: process.env.NODE_ENV === 'development' ? '/' : '/react-antd-admin/',
  plugins: [react(), vitePluginFakeServer({ enableProd: true })],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/setupTests.ts'],
  },
  server: {
    port: 3333,
    proxy: {
      '/api/v1/backend/item_information_querying': {
        target: 'http://210.209.92.145:20001',
        changeOrigin: true,
      },
      '/api/v1/backend/compatibility_querying': {
        target: 'http://210.209.92.145:20002',
        changeOrigin: true,
      },
      '/api/v1/backend/sales_querying/sales_querying': {
        target: 'http://210.209.92.145:20003',
        changeOrigin: true,
      },
    },
  },
  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
  },
  build: {
    outDir: 'build',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          antd: ['antd', '@ant-design/icons'],
          faker: ['@faker-js/faker'],
        },
      },
    },
  },
})
