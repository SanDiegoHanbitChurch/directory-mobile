import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonContents: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
  },
});

interface GoogleSignInButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export default function GoogleSignInButton({
  onPress,
  disabled,
}: GoogleSignInButtonProps) {
  return (
    <Button
      title="Sign In with Google"
      titleStyle={styles.buttonText}
      buttonStyle={styles.button}
      icon={
        <AntDesign
          style={styles.buttonIcon}
          name="google"
          size={20}
          color="white"
        />
      }
      onPress={onPress}
      disabled={disabled}
    />
  );
}
