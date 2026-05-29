# Vite Configuration Guide

## Overview
This project's Vite configuration is optimized for security, performance, and developer experience.

## Security Features Implemented

### 1. **Development Server Security**

#### Host Restrictions
```typescript
server: {
  host: 'localhost',
  allowedHosts: ['localhost', '.localhost', '127.0.0.1', '::1'],
}
```
- Server only responds to localhost addresses
- Prevents DNS rebinding attacks
- Explicit allowlist instead of allowing all hosts

#### CORS Configuration
```typescript
cors: {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}
```
- Explicitly lists allowed origins
- **Security Warning**: Never set `cors: true` in production - allows any website to access your server

#### Security Headers
```typescript
headers: {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
}
```
- Prevents MIME type sniffing
- Prevents clickjacking attacks
- Enables XSS protection
- Controls referrer information

#### File System Protection
```typescript
fs: {
  strict: true,
  deny: ['.env', '.env.*', '*.{crt,pem,key}', '**/.git/**'],
}
```
- Restricts serving files outside workspace root
- Blocks access to sensitive files (.env, certificates, git files)

### 2. **HTTPS in Development (Optional)**

By default, the dev server runs on HTTP. To enable HTTPS:

#### Option A: Using @vitejs/plugin-basic-ssl (Recommended for Quick Setup)

1. **Install the plugin:**
   ```bash
   npm install -D @vitejs/plugin-basic-ssl
   ```

2. **Update vite.config.ts:**
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import basicSsl from '@vitejs/plugin-basic-ssl'
   
   export default defineConfig({
     plugins: [
       react(),
       basicSsl(), // Add this
     ],
     server: {
       https: true, // Enable HTTPS
       // ... rest of config
     },
   })
   ```

3. **Start dev server:**
   ```bash
   npm run dev
   ```
   Access at: `https://localhost:5173`

**Note**: This generates a self-signed certificate. Your browser will show a security warning. This is normal for development - click "Advanced" and proceed.

#### Option B: Using Your Own Certificates

For more control or to avoid browser warnings:

1. **Generate certificates** (using mkcert - recommended):
   ```bash
   # Install mkcert
   # Windows (using Chocolatey):
   choco install mkcert
   
   # Or download from: https://github.com/FiloSottile/mkcert/releases
   
   # Install local CA
   mkcert -install
   
   # Generate certificates
   mkcert localhost 127.0.0.1 ::1
   ```

2. **Update vite.config.ts:**
   ```typescript
   import fs from 'fs'
   
   export default defineConfig({
     server: {
       https: {
         key: fs.readFileSync('./localhost-key.pem'),
         cert: fs.readFileSync('./localhost.pem'),
       },
       // ... rest of config
     },
   })
   ```

3. **Add certificates to .gitignore:**
   ```
   *.pem
   *.crt
   *.key
   ```

### 3. **Production Build Security**

#### Source Maps
```typescript
build: {
  sourcemap: false, // Never expose source maps in production
}
```
- Prevents exposing source code to users
- Source maps can reveal business logic and security mechanisms

#### Code Splitting
```typescript
rollupOptions: {
  output: {
    manualChunks: (id) => {
      // Splits vendor code for better caching
    },
  },
}
```
- Optimizes caching strategy
- Reduces initial bundle size
- Improves performance

## Path Aliases

Cleaner imports using path aliases:

```typescript
// Before
import Button from '../../components/Button'

// After  
import Button from '@components/Button'
```

Available aliases:
- `@` → `./src`
- `@components` → `./src/components`
- `@pages` → `./src/pages`
- `@utils` → `./src/utils`
- `@hooks` → `./src/hooks`
- `@services` → `./src/services`
- `@contexts` → `./src/contexts`
- `@types` → `./src/types`
- `@config` → `./src/config`

**Note**: Update `tsconfig.json` to match these aliases:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@pages/*": ["./src/pages/*"],
      "@utils/*": ["./src/utils/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@services/*": ["./src/services/*"],
      "@contexts/*": ["./src/contexts/*"],
      "@types/*": ["./src/types/*"],
      "@config/*": ["./src/config/*"]
    }
  }
}
```

## API Proxy Configuration

To proxy API requests during development (avoids CORS issues):

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: false, // Set to true if target uses HTTPS with valid cert
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

Example usage:
```typescript
// In your code, use relative path:
fetch('/api/users')
// Vite will proxy to: http://localhost:3000/users
```

## Testing Production Builds

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Preview the production build:**
   ```bash
   npm run preview
   ```

3. **Access at:** `http://localhost:4173`

The preview server uses the same security headers as the dev server.

## Performance Optimizations

### Chunk Size Warnings
```typescript
chunkSizeWarningLimit: 1000, // KB
```
- Warns if chunks exceed 1MB
- Helps identify bloated dependencies

### Target Modern Browsers
```typescript
target: 'esnext',
```
- Enables latest JavaScript features
- Smaller bundle sizes
- Better performance

## Troubleshooting

### HTTPS Certificate Issues
- **Browser warning with self-signed cert**: Normal for development, click through the warning
- **Certificate not trusted**: Run `mkcert -install` to install the local CA
- **Certificate expired**: Regenerate with `mkcert localhost 127.0.0.1 ::1`

### CORS Errors
- Verify the origin is listed in `server.cors.origin`
- Check that credentials match between frontend and backend
- Consider using the proxy configuration instead

### Port Already in Use
- The default config (`strictPort: false`) will try the next available port
- Check terminal output for actual port being used
- Set `strictPort: true` if you need consistent ports

## Additional Resources

- [Vite Configuration Reference](https://vite.dev/config/)
- [Vite Server Options](https://vite.dev/config/server-options)
- [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [mkcert - Making locally trusted certificates](https://github.com/FiloSottile/mkcert)
