import * as React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface LoadingViewProps {
  message?: string;
}

export default function LoadingView({ message }: LoadingViewProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      {message && <Text>{message}...</Text>}
    </View>
  );
}
