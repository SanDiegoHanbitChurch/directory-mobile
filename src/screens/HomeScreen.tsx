import * as React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';

import MembersList from '../components/MembersList';
import { useAuth } from '../context/auth-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: '5%',
  },
});

export default function HomeScreen() {
  const { currentUser, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Current User: {currentUser?.email}</Text>
      <MembersList />
      <Button title="Logout" onPress={() => signOut()} />
    </View>
  );
}
