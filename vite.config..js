/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
*/
import react from '@vitejs/plugin-react';

export default {

  plugins: [react()],
  server: {
    proxy: {
     // '/api': {
       // target: 'http://localhost:8080',
        //changeOrigin: true,
       // rewrite: (path) => path.replace(/^\/api/, ''),
     // },
      //'/api': 'http://localhost:8080',
      //'/api':'https://d2nhsdzuksq35j.cloudfront.net'

    },
  },
};
