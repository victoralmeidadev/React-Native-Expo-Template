import Constants from 'expo-constants';

interface EnvironmentConfig {
  apiUrl: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  enableNetworkLogging: boolean;
  environment: 'development' | 'staging' | 'production';
}

const ENV: Record<string, EnvironmentConfig> = {
  development: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api-dev.example.com',
    logLevel: 'debug',
    enableNetworkLogging: true,
    environment: 'development',
  },
  staging: {
    apiUrl:
      process.env.EXPO_PUBLIC_API_URL || 'https://api-staging.example.com',
    logLevel: 'info',
    enableNetworkLogging: true,
    environment: 'staging',
  },
  production: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
    logLevel: 'error',
    enableNetworkLogging: false,
    environment: 'production',
  },
};

const getEnvironmentConfig = (): EnvironmentConfig => {
  if (__DEV__) {
    return ENV.development;
  }

  const releaseChannel = Constants.expoConfig?.runtimeVersion || 'production';

  if (releaseChannel.includes('staging')) {
    return ENV.staging;
  }

  return ENV.production;
};

export const Config = getEnvironmentConfig();
