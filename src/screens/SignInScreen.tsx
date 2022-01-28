import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { TokenResponse } from 'expo-auth-session';

import { GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '../context/auth-context';
import GoogleSignInButton from '../components/GoogleSignInButton';
import logo from '../../assets/hanbitlogo.png';
import { authConfig } from '../firebase';

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
  const [, response, promptAsync] = Google.useAuthRequest(authConfig);

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { accessToken, idToken } = response.authentication as TokenResponse;
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      signIn(credential);
    } else if (response?.type === 'error') {
      Alert.alert(`Error: ${response?.errorCode}`, response?.error?.message);
    }
  });

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <GoogleSignInButton onPress={() => promptAsync()} />
      <StatusBar />
    </View>
  );
}
