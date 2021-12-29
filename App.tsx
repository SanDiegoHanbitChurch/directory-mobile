import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import Members from './src/components/MembersList';

const queryClient = new QueryClient();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Members />
        <StatusBar style="auto" />
      </View>
    </QueryClientProvider>
  );
}
