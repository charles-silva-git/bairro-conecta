import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { theme } from '../styles/theme';

export default function ProfessionalCard({
  professional,
  onEdit,
  onDelete,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{professional.profession}</Text>
        </View>
        <Text style={styles.name}>{professional.name}</Text>
      </View>

      <Text style={styles.description}>{professional.description}</Text>

      <View style={styles.metaList}>
        <Text style={styles.metaItem}>Telefone: {professional.phone}</Text>
        <Text style={styles.metaItem}>Bairro: {professional.neighborhood}</Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton title="Editar" variant="secondary" onPress={onEdit} />
        <PrimaryButton title="Excluir" variant="danger" onPress={onDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    padding: theme.spacing.lg,
    ...theme.shadow.card,
  },
  header: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.secondarySoft,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
  },
  badgeText: {
    color: theme.colors.secondary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  name: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  metaList: {
    gap: 4,
    marginBottom: theme.spacing.lg,
  },
  metaItem: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  actions: {
    gap: theme.spacing.sm,
  },
});
