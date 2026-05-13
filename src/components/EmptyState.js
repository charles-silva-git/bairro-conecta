import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';

export default function EmptyState({ title, description }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    marginTop: theme.spacing.md,
    padding: theme.spacing.xl,
  },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
});
