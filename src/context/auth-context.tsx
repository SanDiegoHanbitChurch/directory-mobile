import * as React from 'react';
import { onAuthStateChanged, signOut as fbSignOut, User } from 'firebase/auth';

import { auth } from '../firebase';
import LoadingView from '../components/LoadingView';

interface IAuthProviderState {
  loading: boolean;
  currentUser: User | null;
}

interface IAuthContext {
  currentUser: User | null;
  signInWithGoogle: (user: User) => void;
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

  if (state.loading) {
    return <LoadingView />;
  }

  function signInWithGoogle(user: User) {
    setState({
      loading: false,
      currentUser: user,
    });
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

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        currentUser: state.currentUser,
        signInWithGoogle,
        signOut,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };