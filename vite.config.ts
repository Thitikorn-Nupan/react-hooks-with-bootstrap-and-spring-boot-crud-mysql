import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      BASE_URL: ['http://localhost:8080/api/student','http://localhost:8080/api/students']
    }, // Defines process.env as an empty object
  },
})
