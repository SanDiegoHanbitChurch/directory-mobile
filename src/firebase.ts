import { GoogleAuthRequestConfig } from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Initialize Firebase SDK.
const firebaseConfig: FirebaseOptions = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest?.extra?.firebaseAppId,
  measurementId: Constants.manifest?.extra?.firebaseMeasurementId,
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Create Google auth config with client IDs.
// If app ownership is 'null', the config for standalone apps built with EAS build will be used.
export const authConfig: Partial<GoogleAuthRequestConfig> =
  Constants.appOwnership === 'expo'
    ? {
        expoClientId: Constants.manifest?.extra?.expoOauthClientId,
      }
    : {
        androidClientId: Constants.manifest?.extra?.androidOauthClientId,
        iosClientId: Constants.manifest?.extra?.iosOauthClientId,
      };
