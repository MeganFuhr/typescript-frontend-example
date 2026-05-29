/**
 * Environment configuration with validation
 * Only VITE_ prefixed variables are exposed to the client bundle
 */

/**
 * Get an environment variable and throw if it's missing
 * @example
 * const apiKey = getRequiredEnvVar('VITE_API_KEY');
 */
export const getRequiredEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
      `Please add it to your .env file or environment configuration.`
    );
  }
  return value;
};

/**
 * Get an environment variable with a fallback default
 */
export const getOptionalEnvVar = (key: string, defaultValue: string): string => {
  return import.meta.env[key] || defaultValue;
};

/**
 * Validate that a URL is properly formatted
 * @example
 * const apiUrl = validateUrl(getRequiredEnvVar('VITE_API_URL'), 'VITE_API_URL');
 */
export const validateUrl = (url: string, varName: string): string => {
  try {
    new URL(url);
    return url;
  } catch {
    throw new Error(
      `Invalid URL format for ${varName}: ${url}. ` +
      `Please provide a valid URL (e.g., https://example.com)`
    );
  }
};

/**
 * Application configuration
 * Add your environment variables here with appropriate validation
 */
export const config = {
  // Environment mode
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,

  // API Configuration (examples - uncomment and modify as needed)
  // apiUrl: validateUrl(
  //   getRequiredEnvVar('VITE_API_URL'),
  //   'VITE_API_URL'
  // ),
  
  // Optional API URL with default
  apiUrl: getOptionalEnvVar('VITE_API_URL', 'http://localhost:3000'),

  // Optional API timeout (in milliseconds)
  apiTimeout: parseInt(
    getOptionalEnvVar('VITE_API_TIMEOUT', '30000'),
    10
  ),

  // App Configuration
  appName: getOptionalEnvVar('VITE_APP_NAME', 'TypeScript Frontend Example'),
  appVersion: getOptionalEnvVar('VITE_APP_VERSION', '1.0.0'),

  // Feature Flags (examples)
  enableAnalytics: getOptionalEnvVar('VITE_ENABLE_ANALYTICS', 'false') === 'true',
  enableDebugMode: getOptionalEnvVar('VITE_ENABLE_DEBUG', 'false') === 'true',

  // Example: Third-party service keys (only expose public keys, never secrets!)
  // publicApiKey: getOptionalEnvVar('VITE_PUBLIC_API_KEY', ''),
} as const;

// Validate configuration on module load
if (config.isDevelopment) {
  console.log('✓ Environment configuration loaded successfully');
  console.log('Configuration:', {
    mode: config.mode,
    apiUrl: config.apiUrl,
    appName: config.appName,
  });
}

// Type-safe access to config
export type Config = typeof config;
