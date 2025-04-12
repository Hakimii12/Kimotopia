import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from "vite-jsconfig-paths"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),jsconfigPaths()],
  // server: {
  //   port: 4000, // Changes dev server to http://localhost:4000
  // }
})
