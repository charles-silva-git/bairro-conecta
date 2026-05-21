import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { theme } from '../styles/theme';

export default function ProfessionalFormScreen() {
  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.title}>Cadastro de profissional</Text>
      <Text style={styles.description}>
        Nesta etapa, a tela de cadastro foi preparada para receber o formulario
        real do aplicativo.
      </Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Campos previstos</Text>
        <Text style={styles.cardText}>Nome, profissao, telefone, descricao e bairro.</Text>
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
