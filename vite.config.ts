import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Path resolution for cleaner imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@types': path.resolve(__dirname, './src/types'),
      '@config': path.resolve(__dirname, './src/config'),
    },
  },

  // Development server configuration
  server: {
    port: 5173,
    strictPort: false, // Try next port if 5173 is in use
    host: 'localhost', // Explicitly set to localhost for security
    
    // HTTPS configuration for development
    // For production HTTPS, configure your hosting platform/reverse proxy
    // https: false, // Omit https option to use HTTP (default)
    // To use HTTPS in development:
    // 1. Install: npm install -D @vitejs/plugin-basic-ssl
    // 2. Add to plugins: basicSsl()
    // 3. Set https: true
    
    // Security: Restrict which hosts can access the dev server
    // Default allows localhost, .localhost domains, and IP addresses
    allowedHosts: [
      'localhost',
      '.localhost',
      '127.0.0.1',
      '::1',
    ],
    
    // CORS configuration - be explicit about allowed origins
    cors: {
      origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        // Add production domains here when testing locally against production APIs
      ],
      credentials: true,
    },
    
    // Security headers for development
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    
    // File system restrictions
    fs: {
      // Restrict serving files outside workspace root (default: true)
      strict: true,
      
      // Deny access to sensitive files
      deny: [
        '.env',
        '.env.*',
        '*.{crt,pem,key}',
        '**/.git/**',
        '**/node_modules/**/.env',
        '**/config/secrets.*',
      ],
    },
    
    // HMR configuration
    hmr: {
      overlay: true, // Show error overlay
    },
    
    // Optional: API proxy configuration (uncomment and configure as needed)
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },

  // Production build configuration
  build: {
    // Security: Never expose source maps in production
    sourcemap: false,
    
    // Output directory
    outDir: 'dist',
    
    // Clear output directory before build
    emptyOutDir: true,
    
    // Minification
    minify: 'esbuild',
    
    // Target modern browsers
    target: 'esnext',
    
    // Rollup options
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor';
            }
            if (id.includes('@mui')) {
              return 'mui';
            }
            return 'vendor-other';
          }
        },
      },
    },
    
    // Chunk size warning limit (KB)
    chunkSizeWarningLimit: 1000,
  },

  // Preview server configuration (for testing production builds locally)
  preview: {
    port: 4173,
    strictPort: false,
    host: 'localhost',
    
    // Apply same security headers to preview server
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
})
