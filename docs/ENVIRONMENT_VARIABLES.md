# Environment Variables Guide

## Overview
This project uses a centralized configuration system with validation for environment variables. All configuration is managed through `src/config/env.ts`.

## Security Best Practices

### ✅ DO:
- Use `VITE_` prefix for variables that should be exposed to the client
- Store the config in `src/config/env.ts` for type-safe access
- Add new variables to `.env.example` with example/default values
- Use `.env.local` for local development (automatically gitignored)
- Validate URLs and required variables
- Only expose public API keys and non-sensitive configuration

### ❌ DON'T:
- Commit `.env` or `.env.local` files to version control
- Store secrets, passwords, or private API keys in environment variables
- Expose backend-only configuration to the frontend
- Use environment variables without the `VITE_` prefix (they won't be accessible)

## Setup

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in your values in `.env.local`:**
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_APP_NAME=My App
   ```

3. **Import and use the config in your code:**
   ```typescript
   import { config } from './config/env';
   
   // Type-safe access to configuration
   const apiUrl = config.apiUrl;
   const isDev = config.isDevelopment;
   ```

## Adding New Variables

1. **Add to `.env.example`** with a comment and example:
   ```env
   # Your new feature configuration
   VITE_NEW_FEATURE=true
   ```

2. **Add to `src/config/env.ts`** with validation:
   ```typescript
   export const config = {
     // ... existing config
     newFeature: getOptionalEnvVar('VITE_NEW_FEATURE', 'false') === 'true',
   } as const;
   ```

3. **Use in your components:**
   ```typescript
   import { config } from '@/config/env';
   
   if (config.newFeature) {
     // Feature-flagged code
   }
   ```

## Environment Files Priority

Vite loads environment variables in this order (later files override earlier):
1. `.env` - Committed defaults (if needed)
2. `.env.local` - Local overrides (gitignored)
3. `.env.[mode]` - Mode-specific (e.g., `.env.production`)
4. `.env.[mode].local` - Mode-specific local (gitignored)

## Example Use Cases

### API Calls
```typescript
import { config } from './config/env';

const fetchData = async () => {
  const response = await fetch(`${config.apiUrl}/api/data`, {
    timeout: config.apiTimeout,
  });
  return response.json();
};
```

### Feature Flags
```typescript
import { config } from './config/env';

function Analytics() {
  if (!config.enableAnalytics) return null;
  
  return <AnalyticsProvider />;
}
```

### Conditional Debugging
```typescript
import { config } from './config/env';

if (config.enableDebugMode) {
  console.log('Debug info:', data);
}
```

## Troubleshooting

**Variables not updating?**
- Restart the dev server after changing `.env` files
- Vite only processes env vars at build/start time

**Variable is undefined?**
- Ensure it has the `VITE_` prefix
- Check if it's in your `.env.local` file
- Verify the variable name in `src/config/env.ts`

**Type errors?**
- The config object is typed as `const`, so all values are correctly typed
- TypeScript will catch typos and invalid access

## Security Notes

⚠️ **Remember:** Everything in environment variables prefixed with `VITE_` will be bundled into your client-side JavaScript and will be publicly visible. Never store:
- Passwords or secrets
- Private API keys
- Database credentials
- OAuth secrets
- Encryption keys

For sensitive operations, always use a backend API that keeps secrets server-side.
