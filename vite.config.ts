import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Отключаем проверку TypeScript при сборке
    // Vite будет транспилировать TypeScript, но не будет проверять типы
    minify: true,
    rollupOptions: {
      onwarn(warning, warn) {
        // Игнорируем определенные предупреждения
        if (warning.code === 'THIS_IS_UNDEFINED') return
        warn(warning)
      },
    },
  },
})
