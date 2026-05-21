import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import EmptyState from '../components/EmptyState';
import PrimaryButton from '../components/PrimaryButton';
import ProfessionalCard from '../components/ProfessionalCard';
import ScreenContainer from '../components/ScreenContainer';
import { useProfessionals } from '../hooks/useProfessionals';
import { theme } from '../styles/theme';
import { getFirestoreErrorMessage } from '../utils/firestoreErrorMessages';
import { useState } from 'react';

export default function ProfessionalsListScreen({ navigation }) {
  const {
    professionals,
    deleteProfessional,
    errorMessage,
    isLoading,
    refreshProfessionals,
  } = useProfessionals();
  const [search, setSearch] = useState('');

  const normalizedSearch = search.trim().toLowerCase();
  const showLoadingState = isLoading && professionals.length === 0;
  const filteredProfessionals = professionals.filter((professional) =>
    professional.profession.toLowerCase().includes(normalizedSearch)
  );

  function handleDelete(professional) {
    Alert.alert(
      'Excluir profissional',
      `Deseja remover ${professional.name} da lista?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProfessional(professional.id);
            } catch (error) {
              Alert.alert(
                'Erro ao excluir',
                getFirestoreErrorMessage(
                  error,
                  'Nao foi possivel remover o cadastro.'
                )
              );
            }
          },
        },
      ]
    );
  }

  function handleEdit(professionalId) {
    navigation.navigate('ProfessionalForm', { professionalId });
  }

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de profissionais</Text>
        <Text style={styles.description}>
          Consulte os trabalhadores cadastrados no bairro e filtre por
          profissao para encontrar o servico desejado.
        </Text>
      </View>

      <View style={styles.toolbar}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por profissao"
          placeholderTextColor={theme.colors.textMuted}
          style={styles.searchInput}
        />
        <PrimaryButton
          title="Novo cadastro"
          onPress={() =>
            navigation.navigate('ProfessionalForm', { professionalId: null })
          }
        />
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          {filteredProfessionals.length} profissional(is) encontrado(s)
        </Text>
      </View>

      {errorMessage ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerTitle}>Atencao</Text>
          <Text style={styles.errorBannerText}>{errorMessage}</Text>
        </View>
      ) : null}

      {showLoadingState ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Carregando dados do Firestore...</Text>
        </View>
      ) : null}

      {!showLoadingState ? (
        <FlatList
          data={filteredProfessionals}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshing={isLoading && professionals.length > 0}
          onRefresh={refreshProfessionals}
          renderItem={({ item }) => (
            <ProfessionalCard
              professional={item}
              onEdit={() => handleEdit(item.id)}
              onDelete={() => handleDelete(item)}
            />
          )}
          ListEmptyComponent={
            <EmptyState
              title={
                errorMessage
                  ? 'Firebase ainda nao configurado'
                  : 'Nenhum profissional encontrado'
              }
              description={
                errorMessage ||
                'Tente outro termo na busca ou cadastre um novo profissional do bairro.'
              }
            />
          }
        />
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.lg,
  },
  header: {
    gap: theme.spacing.xs,
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
  toolbar: {
    gap: theme.spacing.md,
  },
  searchInput: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    color: theme.colors.text,
    fontSize: 15,
    minHeight: 52,
    paddingHorizontal: theme.spacing.md,
  },
  summary: {
    backgroundColor: theme.colors.secondarySoft,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  summaryText: {
    color: theme.colors.secondary,
    fontSize: 14,
    fontWeight: '700',
  },
  errorBanner: {
    backgroundColor: '#FEE2E2',
    borderRadius: theme.radius.md,
    gap: 4,
    padding: theme.spacing.md,
  },
  errorBannerTitle: {
    color: theme.colors.danger,
    fontSize: 14,
    fontWeight: '800',
  },
  errorBannerText: {
    color: theme.colors.danger,
    fontSize: 13,
    lineHeight: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    gap: theme.spacing.md,
    padding: theme.spacing.xl,
  },
  loadingText: {
    color: theme.colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
});
