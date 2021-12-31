import * as React from 'react';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { StyleSheet, View, Image } from 'react-native';

import { auth } from '../firebase';
import { useAuth } from '../context/auth-context';
import GoogleSignInButton from '../components/GoogleSignInButton';
import logo from '../../assets/hanbitlogo.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginVertical: 30,
  },
});

export default function SignInScreen() {
  const { signIn } = useAuth();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: Constants.manifest?.extra?.expoClientId,
    androidClientId: Constants.mainfest?.extra?.androidClientId,
    iosClientId: Constants.manifest?.extra?.iosClientId,
    webClientId: Constants.manifest?.extra?.webClientId,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token: idToken } = response.params;
      const credential = GoogleAuthProvider.credential(idToken);
      signInWithCredential(auth, credential).then(({ user }) => {
        signIn(user);
      });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <GoogleSignInButton onPress={() => promptAsync()} disabled={!request} />
      <StatusBar />
    </View>
  );
}
