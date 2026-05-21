import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import ScreenContainer from '../components/ScreenContainer';
import { useProfessionals } from '../hooks/useProfessionals';
import { theme } from '../styles/theme';

export default function HomeScreen({ navigation }) {
  const { professionals, errorMessage, isLoading } = useProfessionals();

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.badge}>Servicos locais e comunidade</Text>
        <Text style={styles.title}>
          Encontre profissionais do seu bairro com mais praticidade.
        </Text>
        <Text style={styles.description}>
          O BairroConecta ajuda moradores a encontrar servicos proximos e da
          visibilidade a pequenos empreendedores locais.
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Rede local em destaque</Text>
        <Text style={styles.infoText}>
          {errorMessage
            ? 'O app ja esta preparado para o Firestore, mas ainda precisa da configuracao real do projeto Firebase.'
            : 'Os dados agora sao carregados e persistidos no Firebase Firestore.'}
        </Text>
        {errorMessage ? (
          <Text style={styles.helperText}>{errorMessage}</Text>
        ) : null}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {isLoading ? '...' : professionals.length}
            </Text>
            <Text style={styles.statLabel}>Profissionais</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Campos por cadastro</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          title="Ver lista de profissionais"
          onPress={() => navigation.navigate('ProfessionalsList')}
        />
        <PrimaryButton
          title="Cadastrar novo profissional"
          variant="secondary"
          onPress={() =>
            navigation.navigate('ProfessionalForm', { professionalId: null })
          }
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.lg,
    justifyContent: 'center',
  },
  hero: {
    gap: theme.spacing.sm,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.secondarySoft,
    borderRadius: theme.radius.lg,
    color: theme.colors.secondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    overflow: 'hidden',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.text,
    fontSize: 31,
    fontWeight: '800',
    lineHeight: 40,
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    gap: theme.spacing.xs,
    padding: theme.spacing.lg,
    ...theme.shadow.card,
  },
  infoTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  infoText: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 23,
  },
  helperText: {
    color: theme.colors.danger,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  statCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    flex: 1,
    padding: theme.spacing.md,
  },
  statValue: {
    color: theme.colors.primary,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  actions: {
    gap: theme.spacing.md,
  },
});
