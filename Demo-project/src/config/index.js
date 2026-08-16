/**
 * Environment Configuration
 * Configure API endpoints and other settings here
 */

const ENV = import.meta.env;

export const config = {
  // API Configuration
  apiBaseUrl:
    ENV.VITE_API_BASE_URL ||
    "http://localhost:3000",

  // App Configuration
  appName: "ImpactConnect",
  appVersion: "1.0.0",

  // Feature Flags
  features: {
    enableDebugMode:
      ENV.VITE_DEBUG === "true",
    enableMockData:
      ENV.VITE_USE_MOCK_DATA === "true",
  },

  // Timeout Settings (in milliseconds)
  timeouts: {
    apiRequest: 30000,
    debounce: 300,
  },

  // Storage Keys
  storage: {
    tokenKey: "token",
    userKey: "user",
    settingsKey: "app_settings",
  },
};

export default config;
