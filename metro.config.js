const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Enable New Architecture
config.resolver.unstable_enablePackageExports = true;

// Add TypeScript support
config.resolver.sourceExts = ['ts', 'tsx', 'js', 'jsx', 'json'];
config.resolver.assetExts = config.resolver.assetExts.filter(
  ext => ext !== 'svg'
);
config.resolver.assetExts.push('svg');

module.exports = config;
