import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: env.NODE_ENV === 'production' ? '/' : '/',
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'vue': 'vue/dist/vue.esm-bundler.js'
      }
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        css: {
          additionalData: `@import "@/assets/main.css";`
        }
      }
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia']
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode !== 'production',
      minify: 'terser',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: 'assets/js/[name].[hash].js',
          chunkFileNames: 'assets/js/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (['css', 'woff', 'woff2', 'ttf', 'eot', 'svg'].includes(ext)) {
              return `assets/css/[name].[hash][extname]`;
            }
            return 'assets/[ext]/[name].[hash][extname]';
          },
        },
      },
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    preview: {
      port: 8080,
      open: true,
      headers: {
        'Content-Type': 'text/css; charset=utf-8',
      }
    }
  };
});
