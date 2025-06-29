import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          animations: ["framer-motion"],
        },
      },
    },
    // Optimize chunks
    chunkSizeWarningLimit: 1000,
    // Enable source maps for better debugging
    sourcemap: false,
    // Minify for production
    minify: "terser",
  },
  // Optimize deps
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion"],
  },
  // Performance hints
  server: {
    hmr: {
      overlay: false,
    },
  },
});
