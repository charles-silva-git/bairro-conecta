import { StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '../styles/theme';

export default function AppInput({
  label,
  error,
  multiline = false,
  style,
  ...rest
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={theme.colors.textMuted}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...rest}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    color: theme.colors.text,
    fontSize: 15,
    minHeight: 54,
    paddingHorizontal: theme.spacing.md,
  },
  multilineInput: {
    minHeight: 120,
    paddingTop: theme.spacing.md,
  },
  inputError: {
    borderColor: theme.colors.danger,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: 13,
    fontWeight: '600',
  },
});
