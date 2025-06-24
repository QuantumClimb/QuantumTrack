import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Node modules vendor chunks
          if (id.includes('node_modules')) {
            // React and React-related packages
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            // UI library chunks
            if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            // Query library
            if (id.includes('@tanstack/react-query')) {
              return 'query-vendor';
            }
            // Icon library
            if (id.includes('lucide-react')) {
              return 'icon-vendor';
            }
            // Utility libraries
            if (id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'utils-vendor';
            }
            // Other vendor libraries
            return 'vendor';
          }
          
          // App code chunks
          if (id.includes('/pages/')) {
            return 'pages';
          }
          if (id.includes('/components/ui')) {
            return 'ui-components';
          }
          if (id.includes('/components/')) {
            return 'components';
          }
        }
      }
    },
    // Increase chunk size limit to reduce warnings
    chunkSizeWarningLimit: 1000,
    // Use default minification (esbuild)
    minify: true,
  },
}));
