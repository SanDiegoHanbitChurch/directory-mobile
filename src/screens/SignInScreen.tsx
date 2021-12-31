import * as React from 'react';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { auth } from '../firebase';
import { useAuth } from '../context/auth-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default function SignInScreen() {
  const { signIn } = useAuth();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: Constants.manifest?.extra?.expoClientId,
    androidClientId: Constants.mainfest?.extra?.androidClientId,
    iosClientId: Constants.manifest?.extra?.iosClientId,
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
      <Text>San Diego Hanbit Church</Text>
      <Text>Directory Mobile</Text>
      <TouchableOpacity
        style={styles.button}
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      >
        <Text>Sign In With Google</Text>
      </TouchableOpacity>
      <StatusBar />
    </View>
  );
}
