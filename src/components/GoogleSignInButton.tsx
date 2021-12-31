import * as React from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4C8BF5',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonContents: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

interface GoogleSignInButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const GoogleSignInButton = ({ onPress, disabled }: GoogleSignInButtonProps) => (
  <TouchableHighlight
    style={styles.button}
    underlayColor="#4C8BF5"
    activeOpacity={0.4}
    disabled={disabled}
    onPress={onPress}
  >
    <View style={styles.buttonContents}>
      <AntDesign
        style={styles.buttonIcon}
        name="google"
        size={20}
        color="white"
      />
      <Text style={styles.buttonText}>Sign in with Google</Text>
    </View>
  </TouchableHighlight>
);

export default GoogleSignInButton;
