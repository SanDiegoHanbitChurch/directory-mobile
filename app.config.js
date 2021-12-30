import 'dotenv/config';

export default {
  name: 'directory-mobile',
  slug: 'directory-mobile',
  owner: 'san-diego-hanbit-church',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    bundleIdentifier: 'org.sdhanbit.mobile',
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'org.sdhanbit.mobile',
  },
  web: {
    favicon: './assets/favicon.png',
  },
};
