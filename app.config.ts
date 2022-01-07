import { ExpoConfig } from '@expo/config';
import 'dotenv/config';

export default (): ExpoConfig => ({
  name: 'San Diego Hanbit',
  slug: 'directory-mobile',
  owner: 'san-diego-hanbit-church',
  version: '0.1.0',
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
    buildNumber: '0.1.0',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'org.sdhanbit.mobile',
    versionCode: 2,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  scheme: 'hanbit',
  extra: {
    expoClientId: process.env.EXPO_CLIENT_ID,
    androidClientId: process.env.ANDROID_CLIENT_ID,
    iosClientId: process.env.IOS_CLIENT_ID,
    webClientId: process.env.WEB_CLIENT_ID,
    apiBaseUrl: process.env.API_BASE_URL,
  },
});
