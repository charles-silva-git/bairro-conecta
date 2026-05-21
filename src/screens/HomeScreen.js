import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import ScreenContainer from '../components/ScreenContainer';
import { theme } from '../styles/theme';

export default function HomeScreen({ navigation }) {
  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.badge}>Servicos locais</Text>
        <Text style={styles.title}>Encontre profissionais do seu bairro.</Text>
        <Text style={styles.description}>
          O BairroConecta aproxima moradores e trabalhadores autonomos com uma
          experiencia simples e acessivel.
        </Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          title="Ver profissionais"
          onPress={() => navigation.navigate('ProfessionalsList')}
        />
        <PrimaryButton
          title="Novo cadastro"
          variant="secondary"
          onPress={() => navigation.navigate('ProfessionalForm')}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xl,
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
    overflow: 'hidden',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.text,
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 40,
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  actions: {
    gap: theme.spacing.md,
  },
});
