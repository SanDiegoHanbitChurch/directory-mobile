import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { StyleSheet, View, Button, Text } from 'react-native';

import { auth } from '../firebase';
import { useAuth } from '../context/auth-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function SignInScreen() {
  const { signInWithGoogle } = useAuth();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      '575510018711-g7ifvopac2j3qt368e4s0okfeg460mu7.apps.googleusercontent.com',
    expoClientId:
      '575510018711-u15bc2aftkkegcj1s1mj4uje1v70m9re.apps.googleusercontent.com',
    iosClientId:
      '575510018711-ppeumetei06dan08nkdvov3e2ht1ot0t.apps.googleusercontent.com',
    androidClientId:
      '575510018711-oifl5jh2ddc3u621lfjnu5kte7pb8av3.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token: idToken } = response.params;
      const credential = GoogleAuthProvider.credential(idToken);
      signInWithCredential(auth, credential).then(({ user }) => {
        signInWithGoogle(user);
      });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text>San Diego Hanbit Church</Text>
      <Text>Directory Mobile</Text>
      <Button
        disabled={!request}
        title="Sign In with Google"
        onPress={() => {
          promptAsync();
        }}
      />
      <StatusBar />
    </View>
  );
}
