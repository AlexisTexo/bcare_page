import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./", // Cambiado a ./ para IONOS
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      // Usar opciones de Fast Refresh para desarrollo más rápido
      devTarget: "es2022",
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimizaciones para producción
  build: {
    // Genera archivos separados para mejor caché y dividir código
    cssCodeSplit: true,
    // Activar minificación agresiva
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.log en producción
        drop_debugger: true,
      },
    },
    // Optimizar el tamaño del chunk
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["lucide-react", "@radix-ui/react-toast", "sonner"],
          forms: ["@formspree/react", "react-hook-form"],
          data: ["@tanstack/react-query"],
        },
        // Asegurar que los nombres de los chunks sean consistentes
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: (assetInfo) => {
          // Mantener el nombre original para el favicon
          if (assetInfo.name === "favicon.png") {
            return "img/[name][extname]";
          }
          return "assets/[name].[hash].[ext]";
        },
      },
    },
    // Habilitar chunking para optimizar la carga
    chunkSizeWarningLimit: 1000,
    // Generar reporte de análisis en modo producción
    reportCompressedSize: mode === "production",
    // Asegurar que los assets se copien correctamente
    assetsDir: "assets",
    emptyOutDir: true,
  },
  // Optimizaciones de caché
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
    exclude: ["lovable-tagger"],
  },
}));
