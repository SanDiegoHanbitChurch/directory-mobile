import * as React from 'react';
import * as GoogleAuth from 'expo-google-app-auth';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut as fbSignOut,
  User,
} from 'firebase/auth';
import { Alert } from 'react-native';

import { auth, authConfig } from '../firebase';
import LoadingView from '../components/LoadingView';

interface IAuthProviderState {
  loading: boolean;
  currentUser: User | null;
}

interface IAuthContext {
  currentUser: User | null;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

type AuthProviderProps = {
  [x: string]: unknown;
};

function AuthProvider(props: AuthProviderProps) {
  const [state, setState] = React.useState<IAuthProviderState>({
    loading: true,
    currentUser: null,
  });

  function onAuthStateChange(callback: (state: IAuthProviderState) => void) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        callback({
          loading: false,
          currentUser: user,
        });
      } else {
        callback({
          loading: false,
          currentUser: null,
        });
      }
    });
  }

  React.useEffect(() => {
    const unsubscribe = onAuthStateChange(setState);
    return () => {
      unsubscribe();
    };
  }, []);

  async function signIn() {
    setState({
      loading: true,
      currentUser: null,
    });
    try {
      const logInResult: GoogleAuth.LogInResult = await GoogleAuth.logInAsync(
        authConfig
      );
      if (logInResult.type === 'success') {
        // Login successful. Get ID token & access token and sign in with credential.
        const { idToken, accessToken } = logInResult;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        const { user } = await signInWithCredential(auth, credential);
        setState({
          loading: false,
          currentUser: user,
        });
        Alert.alert('Sign in successful.');
      } else {
        // Login unsuccessful.
        setState({
          loading: false,
          currentUser: null,
        });
        Alert.alert('Error: Could not sign in.');
      }
    } catch (error: any) {
      // Login unsuccessful.
      setState({
        loading: false,
        currentUser: null,
      });
      Alert.alert('Error: Could not sign in.', (error as Error).message);
    }
  }

  async function signOut() {
    setState({
      ...state,
      loading: true,
    });
    try {
      await fbSignOut(auth);
      setState({
        loading: false,
        currentUser: null,
      });
    } catch (signOutError) {
      setState({
        loading: false,
        currentUser: null,
      });
    }
  }

  if (state.loading) {
    return <LoadingView />;
  }

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        currentUser: state.currentUser,
        signIn,
        signOut,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
