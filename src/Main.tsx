import * as React from 'react';

import { useAuth } from './context/auth-context';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';

export default function Main() {
  const { currentUser } = useAuth();

  return currentUser ? <HomeScreen /> : <SignInScreen />;
}
