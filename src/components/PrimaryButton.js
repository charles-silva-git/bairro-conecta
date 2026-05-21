import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../styles/theme';

export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}) {
  function getButtonStyle() {
    if (variant === 'secondary') {
      return styles.secondaryButton;
    }

    if (variant === 'danger') {
      return styles.dangerButton;
    }

    return styles.primaryButton;
  }

  function getTextStyle() {
    if (variant === 'secondary') {
      return styles.secondaryText;
    }

    return styles.primaryText;
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        getButtonStyle(),
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.text, getTextStyle()]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    minHeight: 50,
    paddingHorizontal: theme.spacing.lg,
  },

  primaryButton: {
    backgroundColor: theme.colors.primary,
  },

  secondaryButton: {
    backgroundColor: theme.colors.secondarySoft,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
  },

  dangerButton: {
    backgroundColor: '#DC2626',
  },

  text: {
    fontSize: 15,
    fontWeight: '700',
  },

  primaryText: {
    color: '#FFFFFF',
  },

  secondaryText: {
    color: theme.colors.secondary,
  },

  pressed: {
    opacity: 0.8,
  },

  disabled: {
    opacity: 0.5,
  },
});
