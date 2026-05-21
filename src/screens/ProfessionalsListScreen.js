import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { theme } from '../styles/theme';

export default function ProfessionalsListScreen() {
  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.title}>Lista de profissionais</Text>
      <Text style={styles.description}>
        Esta tela sera conectada ao fluxo de listagem e busca dos profissionais
        cadastrados no app.
      </Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Base de navegacao pronta</Text>
        <Text style={styles.cardText}>
          O proximo passo sera evoluir esta tela com cards, busca e dados reais.
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.lg,
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    padding: theme.spacing.lg,
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  cardText: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
});
