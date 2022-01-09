import { AxiosError } from 'axios';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface ErrorViewProps {
  error?: Error | AxiosError | null;
}

export default function ErrorView({ error }: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Text>Error: {error?.message}</Text>
    </View>
  );
}
