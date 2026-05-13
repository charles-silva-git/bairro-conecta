import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../styles/theme';

export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}) {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  if (variant === 'secondary') {
    buttonStyles.push(styles.secondaryButton);
    textStyles.push(styles.secondaryText);
  }

  if (variant === 'danger') {
    buttonStyles.push(styles.dangerButton);
  }

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        ...buttonStyles,
        pressed && styles.buttonPressed,
        disabled && styles.buttonDisabled,
      ]}
    >
      <Text style={textStyles}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    minHeight: 54,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  secondaryButton: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  dangerButton: {
    backgroundColor: theme.colors.danger,
  },
  text: {
    color: theme.colors.surface,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryText: {
    color: theme.colors.text,
  },
});
