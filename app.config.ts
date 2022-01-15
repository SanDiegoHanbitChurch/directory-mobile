import { ExpoConfig } from '@expo/config';
import 'dotenv/config';

// Set metadata here:
const version = '0.1.0';
const identifier = 'org.sdhanbit.mobile2';

export default (): ExpoConfig => ({
  name: 'San Diego Hanbit Church',
  slug: 'directory-mobile',
  owner: 'san-diego-hanbit-church',
  version,
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
    bundleIdentifier: identifier,
    supportsTablet: true,
    buildNumber: version,
    config: {
      googleSignIn: {
        reservedClientId: process.env.IOS_URL_SCHEME,
      },
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: identifier,
    versionCode: 1,
    config: {
      googleSignIn: {
        apiKey: process.env.ANDROID_GOOGLE_API_KEY,
        certificateHash: process.env.ANDROID_GOOGLE_CERT_HASH,
      },
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    // Base URL for `directory-service` API
    apiBaseUrl: process.env.API_BASE_URL,
    // Android OAuth Client Id (from Google Cloud Console)
    androidOauthClientId: process.env.ANDROID_OAUTH_CLIENT_ID,
    // iOS OAuth Client Id (from Google Cloud Console)
    iosOauthClientId: process.env.IOS_OAUTH_CLIENT_ID,
    // Firebase Config
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID,
    firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
  },
});
