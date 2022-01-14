import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';

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

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <GoogleSignInButton onPress={() => signIn()} />
      <StatusBar />
    </View>
  );
}
